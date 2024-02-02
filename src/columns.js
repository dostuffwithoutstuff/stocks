import { renderProgress } from './RenderProgress';

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
      valueGetter: (params) => {
        return new Date(params.value);
      }
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
    // {
    //   field: 'Rating',
    //   headerName: 'Rating'
    // },
    {
      field: 'Inception',
      headerName: 'Inception',
      type: 'date',
      valueGetter: (params) => {
        return new Date(params.value);
      },
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
      // type: 'number',
    },
    {
      field: '1m-return',
      headerName: '1m-return',
      // type: 'number',
    },
    {
      field: '3m-return',
      headerName: '3m-return',
      // type: 'number',
    },
    {
      field: '6m-return',
      headerName: '6m-return',
      // type: 'number',
    },
    {
      field: '1y-return',
      headerName: '1y-return',
      // type: 'number',
    },
    {
      field: '3y-return',
      headerName: '3y-return',
      // type: 'number',
    },
    {
      field: '5y-return',
      headerName: '5y-return',
      // type: 'number',
    },
    {
      field: '10y-return',
      headerName: '10y-return',
      // type: 'number',
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
      field: 'AP - Jul',
      headerName: 'Jul',
      type: 'number',
    },
    {
      field: 'AP - Jul Upside',
      headerName: 'Jul Upside',
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
      field: 'AP - Mar',
      headerName: 'Mar',
      type: 'number',
    },
    {
      field: 'AP - Mar Upside',
      headerName: 'Mar Upside',
      width: 150,
      type: 'number',
    }
  ];
  
  export default columns;