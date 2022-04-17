import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import "./App.css";

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const proxy = 'https://stock-scrape.herokuapp.com/api/stonks/';

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    sort: 'asc',
    pinned: 'left',
    width: 80,
    checkboxSelection: true
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
        return { backgroundColor: 'red', color: 'white' }
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
        return { backgroundColor: 'green', color: 'white' }
      }
      else if (Number(params.value?.split('%')[0]) < -2.5) {
        return { backgroundColor: 'red', color: 'white' }
      }
    },
  },
  {
    field: '1m-return',
    headerName: '1m-return',
    type: 'number',
    cellStyle: params => {
      if (Number(params.value?.split('%')[0]) > 2.5) {
        return { backgroundColor: 'green', color: 'white' }
      }
      else if (Number(params.value?.split('%')[0]) < -2.5) {
        return { backgroundColor: 'red', color: 'white' }
      }
    },
  },
  {
    field: '3m-return',
    headerName: '3m-return',
    type: 'number',
    cellStyle: params => {
      if (Number(params.value?.split('%')[0]) > 2.5) {
        return { backgroundColor: 'green', color: 'white' }
      }
      else if (Number(params.value?.split('%')[0]) < -2.5) {
        return { backgroundColor: 'red', color: 'white' }
      }
    },
  },
  {
    field: '6m-return',
    headerName: '6m-return',
    type: 'number',
    cellStyle: params => {
      if (Number(params.value?.split('%')[0]) > 2.5) {
        return { backgroundColor: 'green', color: 'white' }
      }
      else if (Number(params.value?.split('%')[0]) < -2.5) {
        return { backgroundColor: 'red', color: 'white' }
      }
    },
  },
  {
    field: '1y-return',
    headerName: '1y-return',
    type: 'number',
    cellStyle: params => {
      if (Number(params.value?.split('%')[0]) > 2.5) {
        return { backgroundColor: 'green', color: 'white' }
      }
      else if (Number(params.value?.split('%')[0]) < -2.5) {
        return { backgroundColor: 'red', color: 'white' }
      }
    },
  },
  {
    field: '3y-return',
    headerName: '3y-return',
    type: 'number',
    cellStyle: params => {
      if (Number(params.value?.split('%')[0]) > 5) {
        return { backgroundColor: 'green', color: 'white' }
      }
      else if (Number(params.value?.split('%')[0]) < -5) {
        return { backgroundColor: 'red', color: 'white' }
      }
    },
  },
  {
    field: '5y-return',
    headerName: '5y-return',
    type: 'number',
    cellStyle: params => {
      if (Number(params.value?.split('%')[0]) > 10) {
        return { backgroundColor: 'green', color: 'white' }
      }
      else if (Number(params.value?.split('%')[0]) < -10) {
        return { backgroundColor: 'red', color: 'white' }
      }
    },
  },
  {
    field: '10y-return',
    headerName: '10y-return',
    type: 'number',
    cellStyle: params => {
      if (Number(params.value?.split('%')[0]) > 15) {
        return { backgroundColor: 'green', color: 'white' }
      }
      else if (Number(params.value?.split('%')[0]) < -15) {
        return { backgroundColor: 'red', color: 'white' }
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
        return { backgroundColor: 'green', color: 'white' }
      }
      else if (Number(params.value?.split('%')[0]) < -2.5) {
        return { backgroundColor: 'red', color: 'white' }
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
        return { backgroundColor: 'green', color: 'white' }
      }
      else if (Number(params.value?.split('%')[0]) < -2.5) {
        return { backgroundColor: 'red', color: 'white' }
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
        return { backgroundColor: 'green', color: 'white' }
      }
      else if (Number(params.value?.split('%')[0]) < -2.5) {
        return { backgroundColor: 'red', color: 'white' }
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
        return { backgroundColor: 'green', color: 'white' }
      }
      else if (Number(params.value?.split('%')[0]) < -2.5) {
        return { backgroundColor: 'red', color: 'white' }
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
        return { backgroundColor: 'green', color: 'white' }
      }
      else if (Number(params.value?.split('%')[0]) < -2.5) {
        return { backgroundColor: 'red', color: 'white' }
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
        return { backgroundColor: 'green', color: 'white' }
      }
      else if (Number(params.value?.split('%')[0]) < -2.5) {
        return { backgroundColor: 'red', color: 'white' }
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
        return { backgroundColor: 'green', color: 'white' }
      }
      else if (Number(params.value?.split('%')[0]) < -2.5) {
        return { backgroundColor: 'red', color: 'white' }
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
        return { backgroundColor: 'green', color: 'white' }
      }
      else if (Number(params.value?.split('%')[0]) < -2.5) {
        return { backgroundColor: 'red', color: 'white' }
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
        return { backgroundColor: 'green', color: 'white' }
      }
      else if (Number(params.value?.split('%')[0]) < -2.5) {
        return { backgroundColor: 'red', color: 'white' }
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
        return { backgroundColor: 'green', color: 'white' }
      }
      else if (Number(params.value?.split('%')[0]) < -2.5) {
        return { backgroundColor: 'red', color: 'white' }
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
        return { backgroundColor: 'green', color: 'white' }
      }
      else if (Number(params.value?.split('%')[0]) < -2.5) {
        return { backgroundColor: 'red', color: 'white' }
      }
    },
  },
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


export default function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  let localArr = [];

  // read our data file in the public folder
  const getConfig = new Promise((resolve, reject) => {
    fetch('./data.json')
      .then(function (response) {
        // switch to use real data or sample data for debugging
        resolve(response.json());
        //resolve(sampleData);
      })
      .catch(function (err) {
        reject(Error("Get config failed"));
      });
  });

  const sleepNow = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

  async function runLoop(configs) {
    setLoading(true);
    for (const config of configs) {
      //await sleepNow(2500);

      const url = `${proxy}?id=${config.id}&ticker=${config.ticker}&type=${config.type}&country=${config.country}&morningstar=${config.morningstar}`;
      console.log(url + '[' + new Date().toUTCString() + '] ')
      try {
        const response = await fetch(url);
        let data = await response.json();

        if (config.type === 'stock') {
          data['Rating'] = config.rating;
        }

        // loop through Analyst Prices
        for (const [key, value] of Object.entries(config)) {
          if (key.startsWith('AP')) {
            data[key] = value;
          }
          const upside = ((value / data['Price'].replace(',', '')) - 1) * 100;
          data[key + ' Upside'] = upside.toFixed(2) + '%';
        }

        localArr = [...localArr, data];
        setData(localArr);
      }
      catch (ex) {
        setLoading(false);
        throw new Error('failed to process: ' + ex);
      }
    }
    setLoading(false);
  }

  // this runs once at start up
  useEffect(() => {
    getConfig
      .then(configs => {
        runLoop(configs);
        // .then(data => {
        //   data; 
        // })
        // .catch(error => {
        //   error.message; // 'An error has occurred: 404'
        // });
      
      })

  }, []);

  return (
    <div>
      <h1>Stocks</h1>
      <h3>Last refreshed: {new Date().toDateString()} {new Date().toLocaleTimeString()}</h3>
      <Box sx={{ height: 40 }}>
      {loading &&
          <CircularProgress />
      }
      </Box>
      <br />
      <div className="ag-theme-alpine" style={{ height: window.innerHeight * 0.75, width: '100%' }}>
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
