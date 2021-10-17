# Stocks

This sample gets stock info (dynamically) and analyst predictions (manually).

## Setup

1. update public data.json with tickers (optional to add analyst predictions)
2. check in changes
3. cmd: npm install
4. cmd: npm run deploy

### Notes

1. For deprecated use of request use:
   npm install --save request
   npm install --save request-promise

2. To bypass CORS errors, switch out proxy services in App.js as needed

3. To deploy to github pages use: 

   * npm install gh-pages --save-dev
   * package.json "homepage": "http://{username}.github.io/{project}"
   * package.json scripts:
         
      * "predeploy": "npm run build",
      * "deploy": "gh-pages -d build"

4. To run locally:
  remove the homepage in package.json, then
  cmd: npm start 

### Run time sample
https://thingsthatdothings.github.io/stocks/