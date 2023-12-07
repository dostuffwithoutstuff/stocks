# Stocks

This sample gets stock info (dynamically) and analyst predictions (manually).

## Setup

1. update public data.json with tickers (optional to add analyst predictions)
2. check in changes
3. cmd: npm install
4. cmd: npm run deploy

### Notes

1. To deploy to github pages use: 

   * npm install gh-pages --save-dev
   * package.json "homepage": "http://{username}.github.io/{project}"
   * package.json scripts:
         
      * "predeploy": "npm run build",
      * "deploy": "gh-pages -d build"

2. To run locally:
  remove the homepage in package.json, then
  cmd: npm start 


### Run time sample (note, it takes a few mins to load - click wait a few times)
https://thingsthatdothings.github.io/stocks/



-----------------
notes: less than a few billion and no dividends removed from list

    {
        "id": 701,
        "ticker": "HXT",
        "type": "etf",
        "morningstar": "t=0P0000PVWG"
    },
    {
        "id": 705,
        "ticker": "VCE",
        "type": "etf",
        "morningstar": "t=0P0000UT18"
    },  


        {
        "id": 802,
        "ticker": "ZDB",
        "type": "etf",
        "morningstar": "t=0P00011VTB"
    },

        {
        "id": 803,
        "ticker": "VSB",
        "type": "etf",
        "morningstar": "t=0P0000UT1C"
    },

    {
        "id": 901,
        "ticker": "HXS",
        "type": "etf",
        "morningstar": "t=0P0000RVBG"
    },
        {
        "id": 902,
        "ticker": "XUU",
        "type": "etf",
        "morningstar": "t=0P00015E41"
    },

        {
        "id": 907,
        "ticker": "VSP",
        "type": "etf",
        "morningstar": "t=0P0000XD8K"
    },

        {
        "id": 908,
        "ticker": "TPU",
        "type": "etf",
        "morningstar": "t=0P00017ET3"
    },

    {
        "id": 909,
        "ticker": "HULC",
        "type": "etf",
        "morningstar": "t=0P0001J5NM"
    },

        {
        "id": 1000,
        "ticker": "VXC",
        "type": "etf",
        "desc": "Int",
        "morningstar": "t=0P00013MBZ"
    },

        {
        "id": 1001,
        "ticker": "XAW",
        "type": "etf",
        "morningstar": "t=0P00015E3Z"
    },

        {
        "id": 1002,
        "ticker": "VEE",
        "type": "etf",
        "morningstar": "t=0P0000UT1D"
    },

    
    {
        "id": 1003,
        "ticker": "VIU",
        "type": "etf",
        "morningstar": "t=0P0001749I"
    },

    {
        "id": 1005,
        "ticker": "XEC",
        "type": "etf",
        "morningstar": "t=0P0000YUAW"
    },

    {
        "id": 1007,
        "ticker": "ZEM",
        "type": "etf",
        "morningstar": "t=0P0000M57K"
    },

        {
        "id": 1008,
        "ticker": "VRIF",
        "type": "etf",
        "morningstar": "t=0P0001KPM7"
    },

        {
        "id": 1100,
        "ticker": "XEQT",
        "type": "etf",
        "desc": "AllInOne",
        "morningstar": "t=0P0001I7EJ"
    },

    {
        "id": 1101,
        "ticker": "VEQT",
        "type": "etf",
        "morningstar": "t=0P0001FKYE"
    },

    
    {
        "id": 1102,
        "ticker": "ZGRO",
        "type": "etf",
        "morningstar": "t=0P0001FIP0"
    },

        {
        "id": 1103,
        "ticker": "HGRO",
        "type": "etf",
        "morningstar": "t=0P0001IFBA"
    },

        {
        "id": 1104,
        "ticker": "XGRO",
        "type": "etf",
        "morningstar": "t=0P0000934I"
    },

        {
        "id": 1106,
        "ticker": "XBAL",
        "type": "etf",
        "morningstar": "t=0P0000934G"
    },

        {
        "id": 1107,
        "ticker": "VBAL",
        "type": "etf",
        "morningstar": "t=0P0001CLVR"
    },
    {
        "id": 1108,
        "ticker": "ZBAL",
        "type": "etf",
        "morningstar": "t=0P0001FIOY"
    },

        {
        "id": 1109,
        "ticker": "VCNS",
        "type": "etf",
        "morningstar": "t=0P0001CLVQ"
    },
    {
        "id": 1110,
        "ticker": "XCNS",
        "type": "etf",
        "morningstar": "t=0P0001I7EI"
    },
    {
        "id": 1111,
        "ticker": "ZCON",
        "type": "etf",
        "morningstar": "t=0P0001FIOZ"
    },

        {
        "id": 1112,
        "ticker": "VCIP",
        "type": "etf",
        "morningstar": "t=0P0001FKYD"
    },
    {
        "id": 1113,
        "ticker": "XINC",
        "type": "etf",
        "morningstar": "t=0P0001I7EH"
    },
    {
        "id": 1114,
        "ticker": "XCG",
        "type": "etf",
        "morningstar": "t=0P000080SI"
    },

       {
        "id": 1200,
        "ticker": "CDZ",
        "type": "etf",
        "desc": "DIV",
        "morningstar": "t=0P00006SO5"
    },
    {
        "id": 1201,
        "ticker": "XDV",
        "type": "etf",
        "morningstar": "t=0P000080SH"
    },
    {
        "id": 1202,
        "ticker": "VDY",
        "type": "etf",
        "morningstar": "t=0P0000XD8J"
    },
    {
        "id": 1203,
        "ticker": "XEI",
        "type": "etf",
        "morningstar": "t=0P0000SWUI"
    },
    {
        "id": 1204,
        "ticker": "ZDV",
        "type": "etf",
        "morningstar": "t=0P0000UHX5"
    },
    {
        "id": 1205,
        "ticker": "XDIV",
        "type": "etf",
        "morningstar": "t=0P0001ANNU"
    },
    {
        "id": 1206,
        "ticker": "PDC",
        "type": "etf",
        "morningstar": "t=0P0000TJY6"
    },

    {
        "id": 1300,
        "ticker": "VRE",
        "type": "etf",
        "desc": "REIT",
        "morningstar": "t=0P0000XD8I"
    },
    {
        "id": 1301,
        "ticker": "ZRE",
        "type": "etf",
        "morningstar": "t=0P0000OMPH"
    },
    {
        "id": 1302,
        "ticker": "XRE",
        "type": "etf",
        "morningstar": "t=0P000080SU"
    },
    {
        "id": 1303,
        "ticker": "RIT",
        "type": "etf",
        "morningstar": "t=0P0000CXI2"
    },

 {
        "id": 1400,
        "ticker": "QQC.F",
        "type": "etf",
        "desc": "Nasdaq",
        "morningstar": "t=0P0000TJY7"
    },
    {
        "id": 1401,
        "ticker": "XQQ",
        "type": "etf",
        "morningstar": "t=0P0000T32L"
    },
    {
        "id": 1402,
        "ticker": "ZQQ",
        "type": "etf",
        "morningstar": "t=0P0000N5JT"
    },
    {
        "id": 1403,
        "ticker": "ZNQ",
        "type": "etf",
        "morningstar": "t=0P0001FIP2"
    },

    {
        "id": 1500,
        "ticker": "XUT",
        "type": "etf",
        "desc": "Sector",
        "morningstar": "t=0P0000SWUG"
    },
    {
        "id": 1501,
        "ticker": "ZUT",
        "type": "etf",
        "morningstar": "t=0P0000N5JN"
    },
    {
        "id": 1502,
        "ticker": "XIT",
        "type": "etf",
        "morningstar": "t=0P000080SS"
    },
    {
        "id": 1503,
        "ticker": "TEC",
        "type": "etf",
        "morningstar": "t=0P0001H7WG"
    },
    {
        "id": 1504,
        "ticker": "HCLN",
        "type": "etf",
        "morningstar": "t=0P0001LIIN"
    },
    {
        "id": 1505,
        "ticker": "ZCLN",
        "type": "etf",
        "morningstar": "t=0P0001LGHB"
    },
    {
        "id": 1506,
        "ticker": "HERO",
        "type": "etf",
        "morningstar": "t=0P0001HVU6"
    },
    {
        "id": 1507,
        "ticker": "BTCC.B",
        "type": "etf",
        "morningstar": "t=0P0001LRNS"
    },
    {
        "id": 1510,
        "ticker": "HMMJ",
        "type": "etf",
        "morningstar": "t=0P0001A2RY"
    },
    {
        "id": 1511,
        "ticker": "CARS.B",
        "type": "etf",
        "morningstar": "t=0P0001BPLA"
    },
 
    {
        "id": 1700,
        "ticker": "ZESG",
        "type": "etf",
        "morningstar": "t=0P0001IVXC"
    },







