const path = require('path');
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const axios = require('axios');

app.use(morgan('dev'));
app.use(bodyParser.json());

const PORT = process.env.FEC_PROXY_PORT || 8080;
const BOOKING_PORT = process.env.BOOKING_PORT || 50003;
const CAROUSEL_PORT = process.env.CAROUSEL_PORT || 50002;
const ABOUT_PORT = process.env.ABOUT_PORT || 50001;
const REVIEWS_PORT = process.env.REVIEWS_PORT || 50000;

const html =
`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="https://kit.fontawesome.com/92139872d0.js" crossorigin="anonymous"></script>
    <title>Proxy Server</title>
  </head>
  <body>

    <div id="booking"></div>
    <div id="carousel"></div>
    <div id="about"></div>
    <div id="reviews"></div>


    <script src="http://127.0.0.1:${BOOKING_PORT}/bundle.js"></script>
    <script src="http://127.0.0.1:${CAROUSEL_PORT}/bundle.js"></script>
    <script src="http://127.0.0.1:${ABOUT_PORT}/bundle.js"></script>
    <script src="http://127.0.0.1:${REVIEWS_PORT}/bundle.js"></script>

  </body>
</html>`;



// BOOKING
app.post('/api/booking/:id', (req, res) => {
  axios.post(`http://127.0.0.1:${BOOKING_PORT}${req.url}`, {...req.body})
    .then(data => data.data)
    .then(data => res.send(data))
    .catch(err => console.log(`error at proxy server post at ${BOOKING_PORT}/api/booking/:id`, err));
});


// CAROUSEL
app.get('/api/carousel/:id', (req, res) => {
  axios.get(`http://127.0.0.1:${CAROUSEL_PORT}${req.url}`)
    .then(data => data.data)
    .then(data => res.send(data))
    .catch(err => console.log(`error at proxy server get at ${CAROUSEL_PORT}/api/carousel/:id`, err));
});


// ABOUT
app.get('/api/about/:id', (req, res) => {
  axios.get(`http://127.0.0.1:${ABOUT_PORT}${req.url}`)
    .then(data => data.data)
    .then(data => res.send({data}))
    .catch(err => console.log(`error at proxy server get at ${ABOUT_PORT}/api/about/:id`, err));
});


// REVIEWS
app.get('/api/reviews/:id', (req, res) => {
  axios.get(`http://127.0.0.1:${REVIEWS_PORT}${req.url}`)
  .then(response => response.data)
  .then(data => res.send(data))
  .catch(err => console.log('error at proxy serving about',err));
});



app.use('/:id', (req, res) => {
  res.send(html);
});

app.listen(PORT, console.log(`Listening on port ${PORT}`));