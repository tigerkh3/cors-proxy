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
  request(
    { url: `${API_URL}` },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: error.message });
      }

      res.json(JSON.parse(body));
    }
  );
});

console.log(API_URL);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));