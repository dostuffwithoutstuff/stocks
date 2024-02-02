import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import { AlertDialog } from './AlertDialog';

import columns from './columns';

//const proxy = 'https://cors-anywhere.herokuapp.com/';  // unlock time period
//const proxy = 'https://cors.bridged.cc/';   // api key
//const proxy = 'https://api.allorigins.win/get?url=';    // data.contents
//const proxy = 'https://api.codetabs.com/v1/proxy/?quest=';  // 5 calls per second
//const proxy = 'https://proxy.cors.sh/';
const proxy = 'https://corsproxy.io/?';


var wait = (ms) => {
  const start = Date.now();
  let now = start;
  while (now - start < ms) {
    now = Date.now();
  }
}

export default function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [created, setCreated] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState();

  // read our data file in the public folder
  const getConfig = new Promise((resolve, reject) => {
    // TODO: switch to use real data or sample data for debugging
    // fetch('./dataSample.json',
    fetch('./data.json',
      {
        // headers: {
        //   'Content-Type': 'application/json',
        //   'Accept': 'application/json'
        // }
      })
      .then(function (response) {
        resolve(response.json());
      })
      .catch(function (err) {
        reject(Error("Get config failed"));
      });

  });

  // Function to add a new row to the data array
  const addRow = (newRow) => {
    setData(prevData => [...prevData, newRow]); // Update the data state with the new row using the functional form of setData
    console.log('newRow added: ', newRow);
  };

  // // Function to replace a row in the data array
  // const replaceRow = (id, newValues) => {
  //   setData(prevData => (
  //     prevData.map(item => {
  //       if (item.id === id) {
  //         return { ...item, ...newValues }; // Replace the row with new values
  //       }
  //       return item; // Return the original item if it's not the one to be replaced
  //     })
  //   ));
  // };

  // handle stocks
  const handleStocks = async (props) => {
    const ticker = props.ticker;
    const country = props.country ? props.country : 'CAN';
    let url = proxy + 'https://marketsandresearch.td.com/tdwca/Public/Stocks/Overview/ca/';
    if (country === 'US') {
      url = proxy + 'https://marketsandresearch.td.com/tdwca/Public/Stocks/Overview/us/';
    }
    setLoading(true);

    try {
      wait(1000);
      const response = await fetch(url + ticker);
      const html = await response.text();

      // Convert the HTML string into a document object
      //html = JSON.parse(html).contents; // for this proxy only
      var parser = new DOMParser();
      var doc = parser.parseFromString(html, 'text/html');
      var elm = {};

      //common
      elm['id'] = props.id;
      elm['Ticker'] = doc.querySelector(".issueExchange").textContent + doc.querySelector(".issueSymbol").textContent;
      props['exchange'] = doc.querySelector(".issueExchange").textContent;
      elm['Name'] = doc.querySelector(".issueName").textContent;
      elm['Category'] = doc.querySelector(".PeersModule a").text.split('-')[0];
      elm['Price'] = doc.querySelector(".primary-data-content li div span").textContent;
      elm['Change'] = doc.querySelector(".changePercent").textContent.replace('(', '').replace(')', '').trim();
      elm['Low52W'] = doc.querySelectorAll("div[low]")[1].getAttribute('low');
      elm['High52W'] = doc.querySelectorAll("div[low]")[1].getAttribute('high');
      elm['Volume'] = doc.querySelector('.volume-label ~ div').textContent;

      //stocks
      elm['Market-Cap'] = doc.querySelectorAll('.fundamentalsTable tr')[0].querySelectorAll('div')[1].textContent;
      elm['DividendYield'] = doc.querySelectorAll('.fundamentalsTable tr')[3].querySelectorAll('div')[1].textContent;
      elm['Ex-Dividend-Date'] = doc.querySelectorAll('.fundamentalsTable tr')[5].querySelectorAll('div')[1].textContent;
      // elm['Rating'] = props.rating;

      // loop through Analyst Prices
      for (const [key, value] of Object.entries(props)) {
        if (key.startsWith('AP')) {
          elm[key] = value;
        }
        const upside = ((value / elm['Price'].replace(',', '')) - 1) * 100;
        elm[key + ' Upside'] = upside.toFixed(2) + '%';
      }

      // add date
      setCreated(new Date().toString());

      // get stock perf values
      const elmWithPerf = await handlePerf(props, elm);

      addRow(elmWithPerf);

    } catch (error) {
      // Handle any errors
      console.log("Stocks failed");
    } finally {
      setLoading(false);
    }

  }

  const handleEtfs = async (props) => {
    const ticker = props.ticker;
    const country = props.country ? props.country : 'CAN';

    let url = proxy + 'https://marketsandresearch.td.com/tdwca/Public/ETFsProfile/Summary/ca/';
    if (country === 'US') {
      url = proxy + 'https://marketsandresearch.td.com/tdwca/Public/ETFsProfile/Summary/us/';
    }
    setLoading(true);

    try {
      wait(1000);
      const response = await fetch(url + ticker);
      const html = await response.text();

      // Convert the HTML string into a document object
      //html = JSON.parse(html).contents; // for this proxy only
      var parser = new DOMParser();
      var doc = parser.parseFromString(html, 'text/html');
      var elm = {};

      //common
      elm['id'] = props.id;
      elm['Ticker'] = doc.querySelector(".issueExchange").textContent + doc.querySelector(".issueSymbol").textContent;
      props['exchange'] = doc.querySelector(".issueExchange").textContent;
      elm['Name'] = doc.querySelector(".issueName").textContent;
      elm['Price'] = doc.querySelector(".primary-data-content li div span").textContent;
      elm['Change'] = doc.querySelector(".changePercent").textContent.replace('(', '').replace(')', '').trim();
      elm['Low52W'] = doc.querySelectorAll("div[low]")[1].getAttribute('low');
      elm['High52W'] = doc.querySelectorAll("div[low]")[1].getAttribute('high');
      elm['Volume'] = doc.querySelector('.volume-label ~ div').textContent;

      //ETF's summary
      // elm['Rating'] = doc.querySelector('.secondary-data-content').querySelector('li:last-child').querySelector('.star-row').querySelectorAll('span')[10]?.textContent;
      elm['Category'] = doc.querySelector('.topFundInfo').querySelectorAll('tr')[1].querySelector('span:last-child').textContent;
      elm['Inception'] = doc.querySelector('.topFundInfo').querySelectorAll('tr')[3].querySelector('span:last-child').textContent;
      elm['Assets'] = doc.querySelectorAll(".FundProfileView table tr")[5].querySelector('td')?.textContent;
      elm['DividendYield'] = doc.querySelectorAll(".FundProfileView table tr")[10].querySelector('td')?.textContent;
      elm['Ex-Dividend-Date'] = doc.querySelectorAll(".FundProfileView table tr")[12].querySelector('td')?.textContent;
      elm['MER'] = doc.querySelectorAll(".FundProfileView table tr")[19].querySelector('td')?.textContent;

      // get etf perf values
      const elmWithEtfPerf = await handleEtfsPerf(props, elm);

      addRow(elmWithEtfPerf);

    } catch (error) {
      // Handle any errors
      console.log("ETFs failed");
    } finally {
      setLoading(false);
    }

  }


  const handlePerf = async (props, elm) => {
    let ticker = props.ticker.replace(".", "-");
    let url = "";

    const country = props.country ? props.country : 'CAN';

    if (country === 'CAN') {
      ticker += '.TO';
    }

    if (props['type'] === 'stock') {
      url = proxy + 'https://www.barchart.com/stockss/quotes/' + ticker + '/performance';
    } else {
      url = proxy + 'https://www.barchart.com/etfs-funds/quotes/' + ticker + '/performance';
    }

    setLoading(true);

    try {
      wait(2000);
      const response = await fetch(url);
      const html = await response.text();

      // Convert the HTML string into a document object
      //html = JSON.parse(html).contents; // for this proxy only
      var parser = new DOMParser();
      var doc = parser.parseFromString(html, 'text/html');

      // get stock's performance
      elm['5d-return'] = doc.querySelector('div.barchart-content-block.symbol-price-performance > div.block-content > barchart-table-scroll > table > tbody > tr:nth-child(2) > td.cell-period-change > div > span:nth-child(2)')?.textContent.split('(')[1].split(')')[0];
      elm['1m-return'] = doc.querySelector('div.barchart-content-block.symbol-price-performance > div.block-content > barchart-table-scroll > table > tbody > tr:nth-child(3) > td.cell-period-change > div > span:nth-child(2)')?.textContent.split('(')[1].split(')')[0];
      elm['3m-return'] = doc.querySelector('div.barchart-content-block.symbol-price-performance > div.block-content > barchart-table-scroll > table > tbody > tr:nth-child(4) > td.cell-period-change > div > span:nth-child(2)')?.textContent.split('(')[1].split(')')[0];
      elm['6m-return'] = doc.querySelector('div.barchart-content-block.symbol-price-performance > div.block-content > barchart-table-scroll > table > tbody > tr:nth-child(5) > td.cell-period-change > div > span:nth-child(2)')?.textContent.split('(')[1].split(')')[0];
      elm['1y-return'] = doc.querySelector('div.barchart-content-block.symbol-price-performance > div.block-content > barchart-table-scroll > table > tbody > tr:nth-child(7) > td.cell-period-change > div > span:nth-child(2)')?.textContent.split('(')[1].split(')')[0];
      elm['3y-return'] = doc.querySelector('div.barchart-content-block.symbol-price-performance > div.block-content > barchart-table-scroll > table > tbody > tr:nth-child(9) > td.cell-period-change > div > span:nth-child(2)')?.textContent.split('(')[1].split(')')[0];
      elm['5y-return'] = doc.querySelector('div.barchart-content-block.symbol-price-performance > div.block-content > barchart-table-scroll > table > tbody > tr:nth-child(10) > td.cell-period-change > div > span:nth-child(2)')?.textContent.split('(')[1].split(')')[0];
      elm['10y-return'] = doc.querySelector('div.barchart-content-block.symbol-price-performance > div.block-content > barchart-table-scroll > table > tbody > tr:nth-child(11) > td.cell-period-change > div > span:nth-child(2)')?.textContent.split('(')[1].split(')')[0];

      return elm;

    } catch (error) {
      // Handle any errors
      console.log("Stocks Perf failed");
    } finally {
      setLoading(false);
    }

  };

  const handleEtfsPerf = async (props, elm) => {
    const ticker = props.ticker;
    const country = props.country ? props.country : 'CAN';

    let url = proxy + 'https://marketsandresearch.td.com/tdwca/Public/ETFsProfile/PerformanceAndRisk/ca/';
    if (country === 'US') {
      url = proxy + 'https://marketsandresearch.td.com/tdwca/Public/ETFsProfile/PerformanceAndRisk/us/';
    }

    setLoading(true);

    try {
      wait(1000);
      const response = await fetch(url + ticker);
      const html = await response.text();

      // Convert the HTML string into a document object
      //html = JSON.parse(html).contents; // for this proxy only
      var parser = new DOMParser();
      var doc = parser.parseFromString(html, 'text/html');

      //ETF's performance and risk
      elm['Risk'] = doc.querySelectorAll(".risk-rating")[0]?.querySelector('.active').textContent;
      elm['Return'] = doc.querySelectorAll(".risk-rating")[1]?.querySelector('.active').textContent;
      elm['3m-return'] = doc.querySelectorAll(".PerformanceOverTimeView table tr")[1]?.querySelectorAll('div')[1].textContent;
      elm['6m-return'] = doc.querySelectorAll(".PerformanceOverTimeView table tr")[1]?.querySelectorAll('div')[2].textContent;
      elm['3y-return'] = doc.querySelectorAll(".PerformanceOverTimeView table tr")[1]?.querySelectorAll('div')[3].textContent;
      elm['5y-return'] = doc.querySelectorAll(".PerformanceOverTimeView table tr")[1]?.querySelectorAll('div')[4].textContent;
      elm['10y-return'] = doc.querySelectorAll(".PerformanceOverTimeView table tr")[1]?.querySelectorAll('div')[5].textContent;

      // return elm;

      let elmWithEtfPerfs = await handlePerf(props, elm);
      return elmWithEtfPerfs;

    } catch (error) {
      // Handle any errors
      console.log("ETF Perf failed");
    } finally {
      setLoading(false);
    }

  };

  // // alert dialog
  // const handleDialogOpen = () => {
  //   setIsOpen(true);
  // };

  // alert dialog
  const handleDialogClose = () => {
    setIsOpen(false);
  };

  // this runs once at start up
  useEffect(() => {

    async function fetchDataWithLoop(configs) {
      // loop through values in config
      for (const config of configs) {
        if (config.type === 'stock') {
          await handleStocks(config);
        } else {
          await handleEtfs(config);
        }
      }
    }

    // read our data file in the public folder
    getConfig
      .then(configs => {
        fetchDataWithLoop(configs);
      });
    // .finally(() => {
    // });
  }, []);

  return (
    <div>
      <h1>Stocks</h1>
      <h3>Last refreshed: {created}</h3>
      <Box sx={{ height: 40 }}>
        {loading &&
          <CircularProgress />
        }
      </Box>
      <br />
      <br />
      <Box
        sx={{
          width: 1,
          '& .cold': {
            backgroundColor: 'red',
            color: 'white',
            fontWeight: '600',
          },
          '& .hot': {
            backgroundColor: 'green',
            color: 'white',
            fontWeight: '600',
          },
          '& .warm': {
            backgroundColor: 'yellow',
            color: 'white',
            fontWeight: '600',
          },
        }}
      >
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            // autoHeight
            rowsPerPageOptions={[10, 25, 100]}
            rows={data}
            columns={columns}
            getCellClassName={(params) => {
              if (params.field === 'Change' || params.field.includes("Upside") || params.field.includes("return")) {
                if (Number(params.value?.replaceAll(',', '').split('%')[0]) > 2.5) {
                  return 'hot';
                }
                else if (Number(params.value?.split('%')[0]) < -2.5) {
                  return 'cold';
                }
              } else if (params.field === 'Price52Week') {

              }
              else {
                return '';
              }
            }}
            onRowClick={(params, event) => {
              //alert(params.row.Ticker + ' ' + params.row.Price);
              setMessage(params.row);
              setIsOpen(true);
            }}
          />
        </div>
      </Box>
      <AlertDialog
        isOpen={isOpen}
        handleClose={handleDialogClose}
        message={message}
      />
    </div>
  );
}
