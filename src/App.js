import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import { renderProgress } from './RenderProgress';
import { AlertDialog } from './AlertDialog';

//const proxy = 'https://cors-anywhere.herokuapp.com/';  // unlock time period
//const proxy = 'https://cors.bridged.cc/';   // api key
//const proxy = 'https://api.allorigins.win/get?url=';    // data.contents
//const proxy = 'https://api.codetabs.com/v1/proxy/?quest=';  // 5 calls per second
//const proxy = 'https://proxy.cors.sh/';
const proxy = 'https://corsproxy.io/?';

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 80,
    type: 'number',
  },
  {
    field: 'Ticker',
    headerName: 'Ticker',
    width: 100,
  },
  {
    field: 'Name',
    headerName: 'Name',
    width: 175
  },
  {
    field: 'Category',
    headerName: 'Category',
    width: 150
  },
  {
    field: 'Price',
    headerName: 'Price',
    type: 'number',
  },
  {
    field: 'Change',
    headerName: 'Change',
    type: 'number',
  },
  {
    field: 'Price52Week',
    headerName: 'Price52Week',
    valueGetter: (params) => {
      return (params.row.Price?.replace(',', '') - params.row.Low52W?.replace(',', '')) / (params.row.High52W?.replace(',', '') - params.row.Low52W?.replace(',', ''));
    },
    renderCell: renderProgress,
    type: "number",
  },
  {
    field: 'Low52W',
    headerName: '52W-Low',
    type: 'number',
  },
  {
    field: 'High52W',
    headerName: '52W-High',
    type: 'number',
  },
  {
    field: 'Volume',
    headerName: 'Volume',
    width: 175
  },
  {
    field: 'Market-Cap',
    headerName: 'Market-Cap',
    type: 'number',
  },
  {
    field: 'DividendYield',
    headerName: 'DividendYield',
    type: 'number',
  },
  {
    field: 'Ex-Dividend-Date',
    headerName: 'Ex-Dividend-Date',
    type: 'date',
  },
  {
    field: 'MER',
    headerName: 'MER',
    type: 'number',
  },
  {
    field: 'Risk',
    headerName: 'Risk',
    width: 125
  },
  {
    field: 'Return',
    headerName: 'Return',
    width: 125
  },
  {
    field: 'Rating',
    headerName: 'Rating'
  },
  {
    field: 'Inception',
    headerName: 'Inception',
    type: 'date',
    width: 150,
  },
  {
    field: 'Assets',
    headerName: 'Assets',
    type: 'number',
  },
  {
    field: '5d-return',
    headerName: '5d-return',
    type: 'number',
  },
  {
    field: '1m-return',
    headerName: '1m-return',
    type: 'number',
  },
  {
    field: '3m-return',
    headerName: '3m-return',
    type: 'number',
  },
  {
    field: '6m-return',
    headerName: '6m-return',
    type: 'number',
  },
  {
    field: '1y-return',
    headerName: '1y-return',
    type: 'number',
  },
  {
    field: '3y-return',
    headerName: '3y-return',
    type: 'number',
  },
  {
    field: '5y-return',
    headerName: '5y-return',
    type: 'number',
  },
  {
    field: '10y-return',
    headerName: '10y-return',
    type: 'number',
  },
  {
    field: 'AP - Mar',
    headerName: 'Mar',
    type: 'number',
  },
  {
    field: 'AP - Mar Upside',
    headerName: 'Mar Upside',
    width: 150,
    type: 'number',
  },
  {
    field: 'AP - Apr',
    headerName: 'Apr',
    type: 'number',
  },
  {
    field: 'AP - Apr Upside',
    headerName: 'Apr Upside',
    width: 150,
    type: 'number',
  },
  {
    field: 'AP - May',
    headerName: 'May',
    type: 'number',
  },
  {
    field: 'AP - May Upside',
    headerName: 'May Upside',
    width: 150,
    type: 'number',
  },
  {
    field: 'AP - Jun',
    headerName: 'Jun',
    type: 'number',
  },
  {
    field: 'AP - Jun Upside',
    headerName: 'Jun Upside',
    width: 150,
    type: 'number',
  },
  {
    field: 'AP - Aug',
    headerName: 'Aug',
    type: 'number',
  },
  {
    field: 'AP - Aug Upside',
    headerName: 'Aug Upside',
    width: 150,
    type: 'number',
  },
  {
    field: 'AP - Sep',
    headerName: 'Sep',
    type: 'number',
  },
  {
    field: 'AP - Sep Upside',
    headerName: 'Sep Upside',
    width: 150,
    type: 'number',
  },
  {
    field: 'AP - Oct',
    headerName: 'Oct',
    type: 'number',
  },
  {
    field: 'AP - Oct Upside',
    headerName: 'Oct Upside',
    width: 150,
    type: 'number',
  },
  {
    field: 'AP - Nov',
    headerName: 'Nov',
    type: 'number',
  },
  {
    field: 'AP - Nov Upside',
    headerName: 'Nov Upside',
    width: 150,
    type: 'number',
  },
  {
    field: 'AP - Dec',
    headerName: 'Dec',
    type: 'number',
  },
  {
    field: 'AP - Dec Upside',
    headerName: 'Dec Upside',
    width: 150,
    type: 'number',
  },
  {
    field: 'AP - Jan',
    headerName: 'Jan',
    type: 'number',
  },
  {
    field: 'AP - Jan Upside',
    headerName: 'Jan Upside',
    width: 150,
    type: 'number',
  },
  {
    field: 'AP - Feb',
    headerName: 'Feb',
    type: 'number',
  },
  {
    field: 'AP - Feb Upside',
    headerName: 'Feb Upside',
    width: 150,
    type: 'number',
  }
];

const sampleData = [
  {
    "id": 100,
    "ticker": "TD",
    "type": "stock",
    "rating": "3 stars",
    "morningstar": "t=0P00006899",
    "AP - Dec": "68.77",
    "AP - Jan": "75",
    "AP - Feb": "82.2",
    "AP - Mar": "87.62",
    "AP - Apr": "86.5",
    "AP - May": "91.71",
    "AP - Jun": "91",
    "AP - Aug": "93",
  },

  {
    "id": 600,
    "ticker": "TSLA",
    "type": "stock",
    "rating": "1.5 stars",
    "morningstar": "t=0P0000OQN8",
    "country": "US",
    "AP - Dec": "200",
    "AP - Jan": "210",
    "AP - Feb": "220",
    "AP - Mar": "225",
    "AP - Apr": "230",
    "AP - May": "240",
    "AP - Jun": "250",
    "AP - Aug": "260",
    "AP - Sep": "270",
  },

  {
    "id": 700,
    "ticker": "XIU",
    "type": "etf",
    "desc": "TSX",
    "morningstar": "t=0P000080SM"
  },

  {
    "id": 1400,
    "ticker": "QQQ",
    "type": "etf",
    "country": "US",
    "morningstar": "t=0P00002D82"
  },

]

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
  let localArr = [];
  const [created, setCreated] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState();

  // read our data file in the public folder
  const getConfig = new Promise((resolve, reject) => {
    fetch('./data.json',
      {
        // headers: {
        //   'Content-Type': 'application/json',
        //   'Accept': 'application/json'
        // }
      })
      .then(function (response) {
        // switch to use real data or sample data for debugging
        resolve(response.json());
        // resolve(sampleData);
      })
      .catch(function (err) {
        reject(Error("Get config failed"));
      });

  });

  // handle stocks
  const handleStocks = (props) => {
    const ticker = props.ticker;
    const country = props.country ? props.country : 'CAN';
    let url = proxy + 'https://marketsandresearch.td.com/tdwca/Public/Stocks/Overview/ca/';
    if (country === 'US') {
      url = proxy + 'https://marketsandresearch.td.com/tdwca/Public/Stocks/Overview/us/';
    }

    setLoading(true);
    wait(1000);
    fetch(url + ticker)
      .then(response => response.text())
      .then(html => {
        setLoading(false);
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
        elm['Rating'] = props.rating;

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

        localArr = [...localArr, elm];
        setData(localArr);

        // more stock items
        handlePerf(props);

      })
      .catch(function (err) {
        console.log("Stocks failed");
      });

  }

  const handleEtfs = (props) => {
    const ticker = props.ticker;
    const country = props.country ? props.country : 'CAN';

    let url = proxy + 'https://marketsandresearch.td.com/tdwca/Public/ETFsProfile/Summary/ca/';
    if (country === 'US') {
      url = proxy + 'https://marketsandresearch.td.com/tdwca/Public/ETFsProfile/Summary/us/';
    }

    setLoading(true);
    wait(1000);
    fetch(url + ticker)
      .then(response => response.text())
      .then(html => {
        setLoading(false);
        // Convert the HTML string into a document object
        // html = JSON.parse(html).contents; // for this proxy only
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
        elm['Rating'] = doc.querySelector('.secondary-data-content').querySelector('li:last-child').querySelector('.star-row').querySelectorAll('span')[10]?.textContent;
        elm['Category'] = doc.querySelector('.topFundInfo').querySelectorAll('tr')[1].querySelector('span:last-child').textContent;
        elm['Inception'] = doc.querySelector('.topFundInfo').querySelectorAll('tr')[3].querySelector('span:last-child').textContent;
        elm['Assets'] = doc.querySelectorAll(".FundProfileView table tr")[5].querySelector('td')?.textContent;
        elm['DividendYield'] = doc.querySelectorAll(".FundProfileView table tr")[10].querySelector('td')?.textContent;
        elm['Ex-Dividend-Date'] = doc.querySelectorAll(".FundProfileView table tr")[12].querySelector('td')?.textContent;
        elm['MER'] = doc.querySelectorAll(".FundProfileView table tr")[19].querySelector('td')?.textContent;

        localArr = [...localArr, elm];
        setData(localArr);

        // more ETF items
        handleEtfsPerf(props);

      })
      .catch(function (err) {
        console.log("ETFs failed");
      });

  }


  const handlePerf = (props) => {
    let ticker = props.ticker.replace(".", "-");
    let url = "";

    const country = props.country ? props.country : 'CAN';
    const id = props.id;

    if (country === 'CAN') {
      ticker += '.TO';
    }

    if (props['type'] === 'stock') {
    url = proxy + 'https://www.barchart.com/stockss/quotes/' + ticker + '/performance';
    } else {
      url = proxy + 'https://www.barchart.com/etfs-funds/quotes/' + ticker + '/performance';
    }

    setLoading(true);
    wait(1000);
    fetch(url)
      .then(response => response.text())
      .then(html => {
        setLoading(false);
        // Convert the HTML string into a document object
        // html = JSON.parse(html).contents; // for this proxy only
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, 'text/html');

        // find the correct item from array
        const index = localArr.findIndex(item => item.id === id);
        const elm = localArr[index];

        //Stocks's performance
        // elm['5d-return'] = doc.querySelector('.bc-table-scrollable-inner > ng-transclude > table > tbody > tr:nth-child(2) > td.cell-period-change > div > span:nth-child(2)')?.textContent.split('(')[1].split(')')[0];
        // elm['1m-return'] = doc.querySelector('.bc-table-scrollable-inner > ng-transclude > table > tbody > tr:nth-child(3) > td.cell-period-change > div > span:nth-child(2)')?.textContent.split('(')[1].split(')')[0];
        // elm['3m-return'] = doc.querySelector('.bc-table-scrollable-inner > ng-transclude > table > tbody > tr:nth-child(4) > td.cell-period-change > div > span:nth-child(2)')?.textContent.split('(')[1].split(')')[0];
        // elm['6m-return'] = doc.querySelector('.bc-table-scrollable-inner > ng-transclude > table > tbody > tr:nth-child(5) > td.cell-period-change > div > span:nth-child(2)')?.textContent.split('(')[1].split(')')[0];
        // elm['1y-return'] = doc.querySelector('.bc-table-scrollable-inner > ng-transclude > table > tbody > tr:nth-child(7) > td.cell-period-change > div > span:nth-child(2)')?.textContent.split('(')[1].split(')')[0];
        // elm['3y-return'] = doc.querySelector('.bc-table-scrollable-inner > ng-transclude > table > tbody > tr:nth-child(9) > td.cell-period-change > div > span:nth-child(2)')?.textContent.split('(')[1].split(')')[0];
        // elm['5y-return'] = doc.querySelector('.bc-table-scrollable-inner > ng-transclude > table > tbody > tr:nth-child(10) > td.cell-period-change > div > span:nth-child(2)')?.textContent.split('(')[1].split(')')[0];
        // elm['10y-return'] = doc.querySelector('.bc-table-scrollable-inner > ng-transclude > table > tbody > tr:nth-child(11) > td.cell-period-change > div > span:nth-child(2)')?.textContent.split('(')[1].split(')')[0];

        // through proxy, use this:
        elm['5d-return'] = doc.querySelector('div.barchart-content-block.symbol-price-performance > div.block-content > barchart-table-scroll > table > tbody > tr:nth-child(2) > td.cell-period-change > div > span:nth-child(2)')?.textContent.split('(')[1].split(')')[0];
        elm['1m-return'] = doc.querySelector('div.barchart-content-block.symbol-price-performance > div.block-content > barchart-table-scroll > table > tbody > tr:nth-child(3) > td.cell-period-change > div > span:nth-child(2)')?.textContent.split('(')[1].split(')')[0];
        elm['3m-return'] = doc.querySelector('div.barchart-content-block.symbol-price-performance > div.block-content > barchart-table-scroll > table > tbody > tr:nth-child(4) > td.cell-period-change > div > span:nth-child(2)')?.textContent.split('(')[1].split(')')[0];
        elm['6m-return'] = doc.querySelector('div.barchart-content-block.symbol-price-performance > div.block-content > barchart-table-scroll > table > tbody > tr:nth-child(5) > td.cell-period-change > div > span:nth-child(2)')?.textContent.split('(')[1].split(')')[0];
        elm['1y-return'] = doc.querySelector('div.barchart-content-block.symbol-price-performance > div.block-content > barchart-table-scroll > table > tbody > tr:nth-child(7) > td.cell-period-change > div > span:nth-child(2)')?.textContent.split('(')[1].split(')')[0];
        elm['3y-return'] = doc.querySelector('div.barchart-content-block.symbol-price-performance > div.block-content > barchart-table-scroll > table > tbody > tr:nth-child(9) > td.cell-period-change > div > span:nth-child(2)')?.textContent.split('(')[1].split(')')[0];
        elm['5y-return'] = doc.querySelector('div.barchart-content-block.symbol-price-performance > div.block-content > barchart-table-scroll > table > tbody > tr:nth-child(10) > td.cell-period-change > div > span:nth-child(2)')?.textContent.split('(')[1].split(')')[0];
        elm['10y-return'] = doc.querySelector('div.barchart-content-block.symbol-price-performance > div.block-content > barchart-table-scroll > table > tbody > tr:nth-child(11) > td.cell-period-change > div > span:nth-child(2)')?.textContent.split('(')[1].split(')')[0];

        // replace elm
        //localArr[index] = elm;
        setData(localArr);

      })
      .catch(function (err) {
        console.log("Stocks Perf failed");
      });

  };

  const handleEtfsPerf = (props) => {
    const ticker = props.ticker;
    const country = props.country ? props.country : 'CAN';
    const id = props.id;

    let url = proxy + 'https://marketsandresearch.td.com/tdwca/Public/ETFsProfile/PerformanceAndRisk/ca/';
    if (country === 'US') {
      url = proxy + 'https://marketsandresearch.td.com/tdwca/Public/ETFsProfile/PerformanceAndRisk/us/';
    }

    setLoading(true);
    wait(1000);
    fetch(url + ticker)
      .then(response => response.text())
      .then(html => {
        setLoading(false);
        // Convert the HTML string into a document object
        // html = JSON.parse(html).contents; // for this proxy only
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, 'text/html');

        // find the correct item from array
        const index = localArr.findIndex(item => item.id === id);
        const elm = localArr[index];

        //ETF's performance and risk
        elm['Risk'] = doc.querySelectorAll(".risk-rating")[0]?.querySelector('.active').textContent;
        elm['Return'] = doc.querySelectorAll(".risk-rating")[1]?.querySelector('.active').textContent;
        elm['3m-return'] = doc.querySelectorAll(".PerformanceOverTimeView table tr")[1]?.querySelectorAll('div')[1].textContent;
        elm['6m-return'] = doc.querySelectorAll(".PerformanceOverTimeView table tr")[1]?.querySelectorAll('div')[2].textContent;
        elm['3y-return'] = doc.querySelectorAll(".PerformanceOverTimeView table tr")[1]?.querySelectorAll('div')[3].textContent;
        elm['5y-return'] = doc.querySelectorAll(".PerformanceOverTimeView table tr")[1]?.querySelectorAll('div')[4].textContent;
        elm['10y-return'] = doc.querySelectorAll(".PerformanceOverTimeView table tr")[1]?.querySelectorAll('div')[5].textContent;

        // replace elm
        //localArr[index] = elm;
        setData(localArr);

        // this gets some additional fields
        handlePerf(props);
      })
      .catch(function (err) {
        console.log("ETFs Perf failed");
      });

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
    getConfig
      .then(configs => {
        // loop through values in config
        configs.forEach(function (config) {
          if (config.type === 'stock') {
            handleStocks(config);
          } else {
            handleEtfs(config);
          }
        });
      });
    // .finally(() => {
    //   setData(localArr);
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
        <DataGrid
          autoHeight
          rowsPerPageOptions={[10, 25, 100]}
          rows={data}
          columns={columns}
          getCellClassName={(params) => {
            if (params.field === 'Change' || params.field.includes("Upside") || params.field.includes("return")) {
              if (Number(params.value?.replaceAll(',','').split('%')[0]) > 2.5) {
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
      </Box>
      <AlertDialog
        isOpen={isOpen}
        handleClose={handleDialogClose}
        message={message}
      />
    </div>
  );
}
