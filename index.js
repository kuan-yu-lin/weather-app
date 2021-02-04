const fetch = require('node-fetch');
require('dotenv').config();
const { response, request } = require('express');
const express = require('express');
const app = express();
app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb'}));

const api_key = process.env.API_KEY;

app.get('/city_search/:city', async (request, response) => {
  const city_query = request.params.city;
  //console.log(city_query);
  const city_search = `https://api.openweathermap.org/data/2.5/weather?q=${city_query}&units=metric&APPID=${api_key}`;
  const fetch_response = await fetch(city_search);
  const city_json = await fetch_response.json();
  //console.log(city_json);
  response.json(city_json);
});

app.get('/weather/:latlon', async (request, response) => {
  //console.log(request.params);
  const latlon = request.params.latlon.split(',');
  //console.log(latlon);
  const lat = latlon[0];
  const lon = latlon[1];
  //console.log(lat, lon);
  const api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`;
  const fetch_response = await fetch(api_url);
  const json = await fetch_response.json();
  //console.log(json);
  response.json(json);
});

app.get('/default_data', async (request, response) => {
  //console.log(request.body);
  const default_data = `https://api.openweathermap.org/data/2.5/weather?lat=25.0913930&lon=121.4649802&units=metric&appid=${api_key}`;
  const fetch_response = await fetch(default_data);
  const default_json = await fetch_response.json();
  console.log(default_json);
  response.json(default_json);
});
