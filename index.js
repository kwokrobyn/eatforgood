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

// Configure generic routes
const routes = require('./server/routes');
app.use('/', routes);

app.listen(app.get('port'), () => {
  console.log('Running port.');
})
