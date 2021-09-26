# Stocks

This sample gets stock info; useful for google sheet app script

## Setup

1. update public data.json with tickers
2. check in changes
3. then: npm run deploy

### Notes

1. For deprecated use of request use:
   npm install --save request
   npm install --save request-promise
2. For CORS proxy use: https://cors.bridged.cc
3. To deploy to github pages use: 
   npm install gh-pages --save-dev
   package.json "homepage": "http://{username}.github.io/{project}"
   package.json scripts:
       "predeploy": "npm run build",
        "deploy": "gh-pages -d build"
4. To run locally, use npm start 

