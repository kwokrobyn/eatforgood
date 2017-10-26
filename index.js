'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const dotenv = require('dotenv')
const path = require('path');

// Configure .env path
dotenv.load({path: '.env'})

const app = express()

app.set('port', (process.env.PORT || '5000'));

// for POST requests
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// ROUTES

app.get('/', (req, res) => {
  res.send("Hello, world.");
});

// Connect to Facebook
app.get('/webhook/', (req, res) => {

  // Parse the query params
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];

  // Checks if a token and mode is in the query string
  if (mode && token) {

    // Checks the mode and token sent is correct
    if (mode == 'subscribe' && token == process.env.VERIFY_TOKEN) {

      // Responds with the challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);

    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
});

app.listen(app.get('port'), () => {
  console.log('Running port.');
})
