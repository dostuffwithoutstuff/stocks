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

3. Create list of API calls for caching:
var list = stocks.map( function(stock) {
  var info = `curl -X GET 'https://stock-scrape.herokuapp.com/api/stonks/?id=${stock.id}&ticker=${stock.ticker}&type=${stock.type}&country=${stock.country}&morningstar=${stock.morningstar}'`
     return info;
});
console.log(list);



### Run time sample
https://thingsthatdothings.github.io/stocks/




