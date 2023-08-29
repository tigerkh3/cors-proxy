const express = require('express');
const request = require('request');
require("dotenv").config();

const app = express();
const API_URL = "https://fantasy.espn.com/apis/v3/games/fba/seasons/" + process.env.REACT_APP_SEASON + "/segments/0/leagues/" + process.env.REACT_APP_LEAGUE // Replace this URL with your own

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/api', (req, res) => {
  // get request to public espn api

  var options = {
    method: "GET",
    mode: "cors",
    credentials: "include",
    headers: {
      "Cookie": `SWID={${process.env.REACT_APP_SWID}}`,
      "Cookie": `espn_s2=${process.env.REACT_APP_ESPN}`,
      "Content-Type": 'application/json',
    },

  }

  fetch(API_URL, options)
  .then( (result, err) => {
    if (err) {
      console.log('error', err)
    } else {
      console.log('worked', result);
      res.send(result)
    }
  })

});

console.log(API_URL);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));