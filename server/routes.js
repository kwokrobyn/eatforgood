const express = require('express')
const accesstoken = "EAAXqgZAW0uwoBAJ0ZCtrVdF07EN0ZAx3EeZAWZBQdi4TRvo29qNLZCDiiQurLKuy43mqpkDQrTMMcu1LpcOlYIkpiluUeyPGCKXd9qt644DlsTB168D673TWaezOvcqVmUhgjgAreZC9dT7RjMlllYipxlsDfnq18qD5wpastC6kwZDZD"
const request = require('request')
const bot = require('./bot')
const db = require('./db')

// import router
const router = express.Router();

router.get('/', (req, res) => {
  res.send("Hello, world.");
});

// Connect to Facebook
router.get('/webhook/', (req, res) => {

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

// Handles POSTS to webhook
// Creates the endpoint for our webhook
router.post('/webhook/', (req, res) => {

  let messaging_events = req.body.entry[0].messaging
  let welcomeState = 1 // integers for 3 states -> 0:not welcome, 1:first loop w/ welcome, 2:2nd loop w/ newHealthGoal, 3: 3rd loop w/ newSnackLimit
  let newHealthGoal = false
  let newSnackLimit = false
  for (let i = 0; i < messaging_events.length; i++) {
    let event = req.body.entry[0].messaging[i]
    let sender = event.sender.id
    if (event.message && event.message.text) {
      let text = event.message.text

      console.log(db.getUser(sender));

      // if user not in db
      if(welcomeState == 1){
        let currentUser = -1
        if(currentUser == -1){
          bot.welcome(sender)
          welcomeState = 2
          continue
        }
        else{
          welcomeState = 0
          continue
        }
      }

      if(newHealthGoal || welcomeState == 2){
        bot.newHealthGoal(sender)
        welcomeState = 3
        newHealthGoal = false
        continue
      }

      if(newSnackLimit || welcomeState == 3){
        bot.newSnackLimit(sender)
        welcomeState = 0
        newSnackLimit = false
        continue
      }
      //bot.sendText(sender, "Text echo: " + text.substring(0,100))

    } else {
      // Returns a '404 Not Found' if event is not from a page subscription
      res.sendStatus(404);
    }
  }
    // Returns a '200 OK' response to all requests
    res.status(200).send('EVENT_RECEIVED');
});

module.exports = router;
