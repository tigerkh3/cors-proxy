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

  document.cookie = `SWID={${process.env.REACT_APP_SWID}}`;
  document.cookie = `espn_s2=${process.env.REACT_APP_ESPN}`;

  var options = {
    method: "GET",
    credentials: "same-origin",
    headers: {
      "Content-Type": 'application/json',
    },

  }

  fetch(API_URL, options)
  .then( (result, err) => {
    if (err) {
      console.log('error', err)
    } else {
      res.send(result)
    }
  })
});

console.log(API_URL);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));