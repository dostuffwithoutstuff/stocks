import React, { useState, useEffect } from 'react';
import rp from "request-promise";

import "./App.css";

export default function App() {
  const [data, setData] = useState([]);
  let localArr = [];

  // read our data file in the public folder
  const getConfig = new Promise((resolve, reject) => {
    fetch('data.json').then(response => {
      return response? response.json() : [];
    }).then(data => {
      // Work with JSON data here
      console.log(data);
    }).catch(err => {
      // Do something for an error here
      console.log("Error Reading data " + err);
    });

  });

  // handle canadian stocks
  const handleStocks = (ticker, country = 'CAN') => {

    let url = 'https://cors.bridged.cc/https://marketsandresearch.td.com/tdwca/Public/Stocks/Overview/ca/';
    if (country === 'US') {
      url = 'https://cors.bridged.cc/https://marketsandresearch.td.com/tdwca/Public/Stocks/Overview/us/';
    }

    rp(url + ticker)
      .then(html => {
        // Convert the HTML string into a document object
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, 'text/html');
        var elm = {}

        //common
        elm['id'] = ticker;
        elm['Ticker'] = doc.querySelector(".issueExchange").textContent + ':' + doc.querySelector(".issueSymbol").textContent;
        elm['Name'] = doc.querySelector(".issueName").textContent;
        elm['Price'] = doc.querySelector(".primary-data-content li div span").textContent;
        elm['Change'] = doc.querySelector(".changePercent").textContent;
        elm['52W Low'] = doc.querySelectorAll("div[low]")[1].getAttribute('low');
        elm['52W High'] = doc.querySelectorAll("div[low]")[1].getAttribute('high');
        elm['Volume'] = doc.querySelector('.volume-label ~ div').textContent;

        //stocks
        elm['Market Cap'] = doc.querySelectorAll('.fundamentalsTable tr')[0].querySelectorAll('div')[1].textContent;
        elm['Dividend Yield'] = doc.querySelectorAll('.fundamentalsTable tr')[3].querySelectorAll('div')[1].textContent;
        elm['Ex-Dividend Date'] = doc.querySelectorAll('.fundamentalsTable tr')[5].querySelectorAll('div')[1].textContent;

        localArr = [...localArr, elm];
        setData(localArr);
      })
      .catch(function (err) {
        console.log("Stocks failed");
      });

  }

  const handleEtfs = (ticker, country = 'CAN') => {

    let url = 'https://cors.bridged.cc/https://marketsandresearch.td.com/tdwca/Public/ETFsProfile/Summary/ca/';
    if (country === 'US') {
      url = 'https://cors.bridged.cc/https://marketsandresearch.td.com/tdwca/Public/ETFsProfile/Summary/us/';
    }

    rp(url + ticker)
      .then(html => {
        // Convert the HTML string into a document object
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, 'text/html');
        var elm = {}

        //common
        elm['id'] = ticker;
        elm['Ticker'] = doc.querySelector(".issueExchange").textContent + ':' + doc.querySelector(".issueSymbol").textContent;
        elm['Name'] = doc.querySelector(".issueName").textContent;
        elm['Price'] = doc.querySelector(".primary-data-content li div span").textContent;
        elm['Change'] = doc.querySelector(".changePercent").textContent;
        elm['52W Low'] = doc.querySelectorAll("div[low]")[1].getAttribute('low');
        elm['52W High'] = doc.querySelectorAll("div[low]")[1].getAttribute('high');
        elm['Volume'] = doc.querySelector('.volume-label ~ div').textContent;

        //ETF's summary
        elm['Rating'] = doc.querySelector('.secondary-data-content').querySelector('li:last-child').querySelector('.star-row').querySelectorAll('span')[10]?.textContent;
        elm['Inception'] = doc.querySelector('.topFundInfo').querySelectorAll('tr')[3].querySelector('span:last-child').textContent;
        elm['Assets'] = doc.querySelectorAll(".FundProfileView table tr")[5].querySelector('td')?.textContent;
        elm['Dividend Yield'] = doc.querySelectorAll(".FundProfileView table tr")[10].querySelector('td')?.textContent;
        elm['Ex-Dividend Date'] = doc.querySelectorAll(".FundProfileView table tr")[10].querySelector('td')?.textContent;
        elm['MER'] = doc.querySelectorAll(".FundProfileView table tr")[19].querySelector('td')?.textContent;

        localArr = [...localArr, elm];
        setData(localArr);

        // more ETF items
        handleEtfsPerf(ticker, country);

      })
      .catch(function (err) {
        console.log("ETFs failed");
      });

  }

  const handleEtfsPerf = (ticker, country = 'CAN') => {

    let url = 'https://cors.bridged.cc/https://marketsandresearch.td.com/tdwca/Public/ETFsProfile/PerformanceAndRisk/ca/';
    if (country === 'US') {
      url = 'https://cors.bridged.cc/https://marketsandresearch.td.com/tdwca/Public/ETFsProfile/PerformanceAndRisky/us/';
    }

    rp(url + ticker)
      .then(html => {
        // Convert the HTML string into a document object
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, 'text/html');

        // find the correct item from array
        const index = localArr.findIndex(item => item.id === ticker);
        const elm = localArr[index];

        //ETF's performance and risk
        elm['Risk'] = doc.querySelectorAll(".risk-rating")[0]?.querySelector('.active').textContent;
        elm['Return'] = doc.querySelectorAll(".risk-rating")[1]?.querySelector('.active').textContent;
        elm['3m return'] = doc.querySelectorAll(".PerformanceOverTimeView table tr")[1]?.querySelectorAll('div')[1].textContent;
        elm['6m return'] = doc.querySelectorAll(".PerformanceOverTimeView table tr")[1]?.querySelectorAll('div')[2].textContent;
        elm['3y return'] = doc.querySelectorAll(".PerformanceOverTimeView table tr")[1]?.querySelectorAll('div')[3].textContent;
        elm['5y return'] = doc.querySelectorAll(".PerformanceOverTimeView table tr")[1]?.querySelectorAll('div')[4].textContent;
        elm['10y return'] = doc.querySelectorAll(".PerformanceOverTimeView table tr")[1]?.querySelectorAll('div')[5].textContent;

        // replace elm
        localArr.splice(index, 1, elm);
        //setData(localArr);
        setData(prevState => {
          return {
            localArr
          };
        });
      })
      .catch(function (err) {
        console.log("ETFs failed");
      });

  }

  // this runs once at start up
  useEffect(() => {

    getConfig
      .then(configs => {
        // loop through values in config
        configs.map((config) => {
          if (config.type === 'stock') {
            handleStocks(config.name, config.country);
          } else {
            handleEtfs(config.name, config.country);
          }
          return null;
        })
      })
    // .finally(() => {
    //   setData(localArr);
    // });

  }, []);

  return (
    <div>
      {JSON.stringify(data)}
    </div>
  );
}
