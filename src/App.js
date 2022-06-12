import React, { useState, useEffect, useRef } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import "./App.css";

import { renderProgress } from './RenderProgress';

const proxy = 'https://stock-scrape.herokuapp.com/api/stonks/';

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
      return (params.row.Price - params.row.Low52W) / (params.row.High52W - params.row.Low52W);
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
  const calledOnce = useRef(false);
  let localArr = [];

  // read our data file in the public folder
  const getConfig = new Promise((resolve, reject) => {
    fetch('./data.json')
      .then(function (response) {
        // switch to use real data or sample data for debugging
        resolve(response.json());
        // resolve(sampleData);
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

  function runLoop2(configs) {
    let myArr = [];
    for (const config of configs) {
      const url = `${proxy}?id=${config.id}&ticker=${config.ticker}&type=${config.type}&country=${config.country}&morningstar=${config.morningstar}`;
      console.log(url + '[' + new Date().toUTCString() + '] ');
      myArr.push(url)
    }


    Promise.all(myArr.map(
      url =>
        fetch(url)
    )
    ).then(function (responses) {
      // Get a JSON object from each of the responses
      return Promise.all(responses.map(function (response) {
        return response.json();
      }));
    }).then(function (data) {
      // Log the data to the console
      // You would do something with both sets of data here
      console.log(data);
    }).catch(function (error) {
      // if there's an error, log it
      console.log(error);
    });

  }

  function chunk(items, size) {
    const chunks = [];
    items = [].concat(...items);

    while (items.length) { chunks.push(items.splice(0, size)); }

    return chunks;
  }

  async function runLoop3(configs) {
    let myUrls = [];
    for (const config of configs) {
      const url = `${proxy}?id=${config.id}&ticker=${config.ticker}&type=${config.type}&country=${config.country}&morningstar=${config.morningstar}`;
      console.log(url + '[' + new Date().toUTCString() + '] ');
      myUrls.push(url)
    }

    var myChunks = chunk(myUrls, 2);
    for (let i = 0; i < myChunks.length; i++) {
      console.log('iiiiii: ' + i);
      await Promise.allSettled(
        myChunks[i].map(
          url =>
            fetch(url)
        ))
        .then(responseArr => {
          responseArr.forEach(res => {
            console.log(res.value);
            // res.status & res.value
          });
          // .then(function (responses) {
          //   // Get a JSON object from each of the responses
          //   return Promise.all(responses.map(function (response) {
          //     return response.json();
          //   }));
        }).then(function (data) {
          // Log the data to the console
          // You would do something with both sets of data here
          console.log(data);
        })
        .catch((err) => { console.log("error: " + err); })

    }

  }

  // this runs once at start up
  useEffect(() => {
    if (calledOnce.current) {
      return;
    }

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
    calledOnce.current = true;
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
        }}
      >
        <DataGrid
          autoHeight
          rows={data}
          columns={columns}
          getCellClassName={(params) => {
            if (params.field === 'Change' || params.field.includes("Upside") || params.field.includes("return")) {
              if (Number(params.value?.split('%')[0]) > 2.5) {
                return 'hot';
              }
              else if (Number(params.value?.split('%')[0]) < -2.5) {
                return 'cold';
              }
            } else {
              return '';
            }
          }}
          onRowClick={(params, event) => {
              alert(params.row.Ticker + ' ' + params.row.Price);
          }}
        />
      </Box>
    </div>
  );
}
