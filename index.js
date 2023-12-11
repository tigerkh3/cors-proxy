const express = require('express');
const request = require('request');
const axios = require('axios');
require("dotenv").config();

const app = express();
const API_URL = "https://fantasy.espn.com/apis/v3/games/fba/seasons/" + process.env.REACT_APP_SEASON + "/segments/0/leagues/" + process.env.REACT_APP_LEAGUE // Replace this URL with your own
var scoringPeriod = 45;
var filter = `{"players":{"filterSlotIds":{"value":[0,5,11,1,2,6,3,4]},"filterStatsForCurrentSeasonScoringPeriodId":{"value":[${scoringPeriod}]},"sortAppliedStatTotal":null,"sortAppliedStatTotalForScoringPeriodId":null,"sortStatId":null,"sortStatIdForScoringPeriodId":{"additionalValue":${scoringPeriod},"sortAsc":false,"sortPriority":2,"value":0},"sortPercOwned":{"sortPriority":3,"sortAsc":false},"filterStatus":{"value":["FREEAGENT","WAIVERS"]},"limit":50}}`
var options = {
  'url': `${API_URL}`,
  'params': {},
  'method': "get",
  'headers': {
    'Cookie': `SWID={${process.env.REACT_APP_SWID}}; espn_s2=${process.env.REACT_APP_ESPN};`
  },
  'withCredentials': 'true'
}

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/playerData', (req, res) => {
  options.params.view = 'kona_player_info';
  options.headers['x-fantasy-filter'] = filter;
  axios.default.request(options)
  .then (result => {
    console.log(result);
    res.send(result.data)
  })
}
)

app.get('/matchupData', (req, res) => {
  // get request to public espn api
  console.log(req.cookies);

  axios.default.request(options)
  .then (result => {
    console.log(result);
    res.send(result.data)
  })

});

console.log(API_URL);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));