import React, { useState, useEffect } from 'react';
import rp from "request-promise";
import { AgGridReact } from 'ag-grid-react';
import { DataGrid } from '@mui/x-data-grid';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';
import "./App.css";

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

//const proxy = 'https://cors-anywhere.herokuapp.com/';  // unlock time period
//const proxy = 'https://cors.bridged.cc/';   // api key
const proxy = 'https://api.allorigins.win/get?url=';    // data.contents
//const proxy = 'https://api.codetabs.com/v1/proxy/?quest=';  // 5 calls per second
//const proxy = 'https://thingproxy.freeboard.io/fetch/'; // 10 requests/second, 100,000 characters


const columns = [
  {
    field: 'id',
    headerName: 'ID',
    sort: 'asc',
    pinned: 'left',
    width: 80
  },
  {
    field: 'Ticker',
    headerName: 'Ticker',
    width: 150,
    pinned: 'left',
  },
  {
    field: 'Name',
    headerName: 'Name',
    type: 'name',
    width: 175
  },
  {
    field: 'Category',
    headerName: 'Category',
    type: 'category',
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
    cellStyle: params => {
      if (Number(params.value?.split('%')[0]) > 2.5) {
        return { backgroundColor: 'green', color: 'white' }
      }
      else if (Number(params.value?.split('%')[0]) < -2.5) {
        return { backgroundColor: 'red', color: 'white'  }
      }
    },
  },
  {
    field: '52W-Low',
    headerName: '52W-Low',
    type: 'number',
  },
  {
    field: '52W-High',
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
    field: 'DividendYield',
    headerName: 'DividendYield',
    type: 'number',
  },
  {
    field: '5d-return',
    headerName: '5d-return',
    type: 'number',
    cellStyle: params => {
      if (Number(params.value?.split('%')[0]) > 2.5) {
        return { backgroundColor: 'green', color: 'white'  }
      }
      else if (Number(params.value?.split('%')[0]) < -2.5) {
        return { backgroundColor: 'red', color: 'white'  }
      }
    },
  },
  {
    field: '1m-return',
    headerName: '1m-return',
    type: 'number',
    cellStyle: params => {
      if (Number(params.value?.split('%')[0]) > 2.5) {
        return { backgroundColor: 'green', color: 'white'  }
      }
      else if (Number(params.value?.split('%')[0]) < -2.5) {
        return { backgroundColor: 'red', color: 'white'  }
      }
    },
  },
  {
    field: '3m-return',
    headerName: '3m-return',
    type: 'number',
    cellStyle: params => {
      if (Number(params.value?.split('%')[0]) > 2.5) {
        return { backgroundColor: 'green', color: 'white'  }
      }
      else if (Number(params.value?.split('%')[0]) < -2.5) {
        return { backgroundColor: 'red', color: 'white'  }
      }
    },
  },
  {
    field: '6m-return',
    headerName: '6m-return',
    type: 'number',
    cellStyle: params => {
      if (Number(params.value?.split('%')[0]) > 2.5) {
        return { backgroundColor: 'green', color: 'white'  }
      }
      else if (Number(params.value?.split('%')[0]) < -2.5) {
        return { backgroundColor: 'red', color: 'white'  }
      }
    },
  },
  {
    field: '1y-return',
    headerName: '1y-return',
    type: 'number',
    cellStyle: params => {
      if (Number(params.value?.split('%')[0]) > 2.5) {
        return { backgroundColor: 'green', color: 'white'  }
      }
      else if (Number(params.value?.split('%')[0]) < -2.5) {
        return { backgroundColor: 'red', color: 'white'  }
      }
    },
  },
  {
    field: '3y-return',
    headerName: '3y-return',
    type: 'number',
    cellStyle: params => {
      if (Number(params.value?.split('%')[0]) > 5) {
        return { backgroundColor: 'green', color: 'white'  }
      }
      else if (Number(params.value?.split('%')[0]) < -5) {
        return { backgroundColor: 'red', color: 'white'  }
      }
    },
  },
  {
    field: '5y-return',
    headerName: '5y-return',
    type: 'number',
    cellStyle: params => {
      if (Number(params.value?.split('%')[0]) > 10) {
        return { backgroundColor: 'green', color: 'white'  }
      }
      else if (Number(params.value?.split('%')[0]) < -10) {
        return { backgroundColor: 'red', color: 'white'  }
      }
    },
  },
  {
    field: '10y-return',
    headerName: '10y-return',
    type: 'number',
    cellStyle: params => {
      if (Number(params.value?.split('%')[0]) > 15) {
        return { backgroundColor: 'green', color: 'white'  }
      }
      else if (Number(params.value?.split('%')[0]) < -15) {
        return { backgroundColor: 'red', color: 'white'  }
      }
    },
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
    cellStyle: params => {
      if (Number(params.value?.split('%')[0]) > 2.5) {
        return { backgroundColor: 'green', color: 'white'  }
      }
      else if (Number(params.value?.split('%')[0]) < -2.5) {
        return { backgroundColor: 'red', color: 'white'  }
      }
    },
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
    cellStyle: params => {
      if (Number(params.value?.split('%')[0]) > 2.5) {
        return { backgroundColor: 'green', color: 'white'  }
      }
      else if (Number(params.value?.split('%')[0]) < -2.5) {
        return { backgroundColor: 'red', color: 'white'  }
      }
    },
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
    cellStyle: params => {
      if (Number(params.value?.split('%')[0]) > 2.5) {
        return { backgroundColor: 'green', color: 'white'  }
      }
      else if (Number(params.value?.split('%')[0]) < -2.5) {
        return { backgroundColor: 'red', color: 'white'  }
      }
    },
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
    cellStyle: params => {
      if (Number(params.value?.split('%')[0]) > 2.5) {
        return { backgroundColor: 'green', color: 'white'  }
      }
      else if (Number(params.value?.split('%')[0]) < -2.5) {
        return { backgroundColor: 'red', color: 'white'  }
      }
    },
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
    cellStyle: params => {
      if (Number(params.value?.split('%')[0]) > 2.5) {
        return { backgroundColor: 'green', color: 'white'  }
      }
      else if (Number(params.value?.split('%')[0]) < -2.5) {
        return { backgroundColor: 'red', color: 'white'  }
      }
    },
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
    cellStyle: params => {
      if (Number(params.value?.split('%')[0]) > 2.5) {
        return { backgroundColor: 'green', color: 'white'  }
      }
      else if (Number(params.value?.split('%')[0]) < -2.5) {
        return { backgroundColor: 'red', color: 'white'  }
      }
    },
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
    cellStyle: params => {
      if (Number(params.value?.split('%')[0]) > 2.5) {
        return { backgroundColor: 'green', color: 'white'  }
      }
      else if (Number(params.value?.split('%')[0]) < -2.5) {
        return { backgroundColor: 'red', color: 'white'  }
      }
    },
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
    cellStyle: params => {
      if (Number(params.value?.split('%')[0]) > 2.5) {
        return { backgroundColor: 'green', color: 'white'  }
      }
      else if (Number(params.value?.split('%')[0]) < -2.5) {
        return { backgroundColor: 'red', color: 'white'  }
      }
    },
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
    cellStyle: params => {
      if (Number(params.value?.split('%')[0]) > 2.5) {
        return { backgroundColor: 'green', color: 'white'  }
      }
      else if (Number(params.value?.split('%')[0]) < -2.5) {
        return { backgroundColor: 'red', color: 'white'  }
      }
    },
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
    cellStyle: params => {
      if (Number(params.value?.split('%')[0]) > 2.5) {
        return { backgroundColor: 'green', color: 'white'  }
      }
      else if (Number(params.value?.split('%')[0]) < -2.5) {
        return { backgroundColor: 'red', color: 'white'  }
      }
    },
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
    cellStyle: params => {
      if (Number(params.value?.split('%')[0]) > 2.5) {
        return { backgroundColor: 'green', color: 'white'  }
      }
      else if (Number(params.value?.split('%')[0]) < -2.5) {
        return { backgroundColor: 'red', color: 'white'  }
      }
    },
  },
];


const sampleData = [
  {
    "id": 100,
    "ticker": "TD",
    "type": "stock",
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
    "country": "US",
    "AP - Dec": "501.29",
    "AP - Jan": "753",
    "AP - Feb": "670",
    "AP - Mar": "882",
    "AP - Apr": "800",
    "AP - May": "772",
    "AP - Jun": "800",
    "AP - Aug": "900",
    "AP - Sep": "862",
  },

  {
    "id": 700,
    "ticker": "XIU",
    "type": "etf"
  },

  {
    "id": 1400,
    "ticker": "QQQ",
    "type": "etf",
    "country": "US",
  },
]


const useStyles = makeStyles({
  root: {
    '& .cold': {
      backgroundColor: 'red',
      color: 'white',
    },
    '& .hot': {
      backgroundColor: 'green',
      color: 'white',
    },
    sticky: {
      position: "sticky",
      left: 0,
      background: "white",
      boxShadow: "5px 2px 5px grey"
    }
  },
});

export default function App() {
  const classes = useStyles();
  const [loading, setLoading] = useState([]);
  const [data, setData] = useState([]);
  let localLoading = [];
  let localArr = [];

  // read our data file in the public folder
  const getConfig = new Promise((resolve, reject) => {
    fetch('./data.json',
      {
        // headers: {
        //   'Content-Type': 'application/json',
        //   'Accept': 'application/json'
        // }
      }
    )
      .then(function (response) {
        // switch to use real data or sample data for debugging
        resolve(response.json());
        //resolve(sampleData);
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

    localLoading = [...loading, ticker];
    setLoading(localLoading);
    rp(url + ticker)
      .then(html => {
        localLoading = loading.filter(function (element) {
          return element !== 2
        });
        setLoading(localLoading);
        // Convert the HTML string into a document object
        html = JSON.parse(html).contents; // for this proxy only
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
        elm['52W-Low'] = doc.querySelectorAll("div[low]")[1].getAttribute('low');
        elm['52W-High'] = doc.querySelectorAll("div[low]")[1].getAttribute('high');
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

        localArr = [...localArr, elm];
        setData(localArr);
        // setData(prevState => {
        //   return {
        //     ...localArr
        //   };
        // });

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

    localLoading = [...loading, ticker];
    setLoading(localLoading);
    rp(url + ticker)
      .then(html => {
        localLoading = loading.filter(function (element) {
          return element !== 2
        });
        setLoading(localLoading);
        // Convert the HTML string into a document object
        html = JSON.parse(html).contents; // for this proxy only
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
        elm['52W-Low'] = doc.querySelectorAll("div[low]")[1].getAttribute('low');
        elm['52W-High'] = doc.querySelectorAll("div[low]")[1].getAttribute('high');
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
        // setData(prevState => {
        //   return {
        //     ...localArr
        //   };
        // });

        // more ETF items
        handleEtfsPerf(props);

      })
      .catch(function (err) {
        console.log("ETFs failed");
      });

  }


  const handlePerf = (props) => {
    let ticker = props.ticker.replace(".", "-");

    const country = props.country ? props.country : 'CAN';
    const id = props.id;

    let url = proxy + 'https://www.theglobeandmail.com/investing/markets/stocks/' + ticker + '-T/';
    if (country === 'US') {
      // the above url doesn't work well with US ETFs
      if (props['type'] === 'etf') {
        return;
      }

      if (props['exchange'].startsWith('NYSE')) {
        ticker = ticker + '-N/';
      }
      else { //Nasdaq
        ticker = ticker + '-Q/';
      }
      url = proxy + 'https://www.theglobeandmail.com/investing/markets/stocks/' + ticker;
    }

    localLoading = [...loading, ticker];
    setLoading(localLoading);
    rp(url)
      .then(html => {
        localLoading = loading.filter(function (element) {
          return element !== 2
        });
        setLoading(localLoading);
        // Convert the HTML string into a document object
        html = JSON.parse(html).contents; // for this proxy only
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, 'text/html');

        // find the correct item from array
        const index = localArr.findIndex(item => item.id === id);
        const elm = localArr[index];

        //Sticks's performance
        elm['5d-return'] = doc.querySelector('[name="percentChange5d"]')?.getAttribute('value');
        elm['1m-return'] = doc.querySelector('[headers="pricePerformanceData_period_1m pricePerformanceData_performance"] span')?.textContent.split('(')[1].split(')')[0];
        elm['3m-return'] = doc.querySelector('[headers="pricePerformanceData_period_3m pricePerformanceData_performance"] span')?.textContent.split('(')[1].split(')')[0];
        elm['1y-return'] = doc.querySelector('[name="return1y"]')?.getAttribute('value');
        //only for stocks 
        if (props['type'] === 'stock') {
          elm['3y-return'] = doc.querySelector('[name="return3y"]')?.getAttribute('value');
          elm['5y-return'] = doc.querySelector('[name="return5y"]')?.getAttribute('value');
        }
        else {
          elm['1y-return'] = doc.querySelectorAll('.performancePrice')[2]?.textContent.split('(').pop().split(')')[0];
        }

        // replace elm
        //localArr[index] = elm;
        setData(localArr);
        // setData(prevState => {
        //   return {
        //     ...localArr
        //   };
        // });
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

    localLoading = [...loading, ticker];
    setLoading(localLoading);
    rp(url + ticker)
      .then(html => {
        localLoading = loading.filter(function (element) {
          return element !== 2
        });
        setLoading(localLoading);
        // Convert the HTML string into a document object
        html = JSON.parse(html).contents; // for this proxy only
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
        // setData(prevState => {
        //   return {
        //     ...localArr
        //   };
        // });

        handlePerf(props);
      })
      .catch(function (err) {
        console.log("ETFs Perf failed");
      });

  };

  // this runs once at start up
  useEffect(() => {

    getConfig
      .then(configs => {
        // loop through values in config
        configs.map((config) => {
          if (config.type === 'stock') {
            handleStocks(config);
          } else {
            handleEtfs(config);
          }
          return null;
        })
      })
    // .finally(() => {
    //   setData(localArr);
    // });

  }, []);

  return (
    <div className={classes.root}>
      <h1>Stocks</h1>
      <h3>Last refreshed: {new Date().toDateString()} {new Date().toLocaleTimeString()}</h3>
      <Box sx={{ height: 40 }}>
        <Fade
          in={loading.length > 0}
          style={{
            transitionDelay: loading.length > 0 ? '800ms' : '0ms',
          }}
        // unmountOnExit
        >
          <CircularProgress />
        </Fade>
      </Box>
      <div style={{ height: window.innerHeight * 0.75, width: '100%' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ flexGrow: 1 }}>
            <DataGrid
              rows={data}
              columns={columns}
              //pageSize={100}
              //rowsPerPageOptions={[25, 50, 100]}
              checkboxSelection
              //disableSelectionOnClick
              //loading
              getCellClassName={(params) => {
                if (params.field.includes("Upside")) {
                  return Number(params.value?.split('%')[0]) >= 5 ? 'hot' : null;
                }
                else if (params.field === 'Change') {
                  return Number(params.value?.split('%')[0]) >= 0 ? 'hot' : 'cold';
                }
                else if (['5d-return', '1m-return', '3m-return', '6m-return', '1y-return', '3y-return', '5y-return', '10y-return'].indexOf(params.field) !== -1) {
                  if (Number(params.value?.split('%')[0]) >= 2.5) {
                    return 'hot';
                  }
                  else if ((Number(params.value?.split('%')[0]) <= -2.5)) {
                    return 'cold';
                  }
                }
                else if (params.field === 'id') {
                  return 'sticky';
                }
                else {
                  return '';
                }
              }}
              onRowDoubleClick={(params, event) => {
                alert(`${params.row.Ticker} --> ${params.row.Name} --> ${params.row.Price} --> Div ${params.row.DividendYield}`);
              }}
            />
          </div>
        </div>
      </div>
      {/* {JSON.stringify(data)} */}
      <br />
      <br />
      <br />
      <div className="ag-theme-alpine" style={{ height: window.innerHeight * 1.5, width: '100%' }}>
        <AgGridReact
          rowData={data}
          columnDefs={columns.map(({ field, pinned, cellStyle, width }) => ({ 'field': field, 'pinned': pinned, 'cellStyle': cellStyle, 'width': width, sortable: true, filter: true, resizable: true }))}
          rowSelection={'multiple'}
          rowMultiSelectWithClick={true}
        >

        </AgGridReact>
      </div>
    </div>
  );
}
