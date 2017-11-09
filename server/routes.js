const express = require('express')
const accesstoken = "EAAXqgZAW0uwoBAJ0ZCtrVdF07EN0ZAx3EeZAWZBQdi4TRvo29qNLZCDiiQurLKuy43mqpkDQrTMMcu1LpcOlYIkpiluUeyPGCKXd9qt644DlsTB168D673TWaezOvcqVmUhgjgAreZC9dT7RjMlllYipxlsDfnq18qD5wpastC6kwZDZD"
const request = require('request')
const bot = require('./bot')
const uuid = require('uuid')

const firebase = require('./firebase');
const db = firebase.database();

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

  for (let i = 0; i < messaging_events.length; i++) {
    let event = req.body.entry[0].messaging[i]
    let sender = event.sender.id

    // normal text
    if (event.message && event.message.text) {
      let text = event.message.text;
      let payload = event.message.payload;

      if (payload == "<HEALTH_GOAL_POOR>") {
        bot.sendMessage(sender, {"text": "You suck"})
      }

      // // get referene for user from db
      // const userRef = db.ref('users/'+ sender);
      //
      // userRef.once("value", (snapshot) => {
      //   // if user does not exist
      //   if (snapshot.val() == null) {
      //     userRef.set({
      //       snackLimit: 0,
      //       healthGoal: 0,
      //       totalAverage: 0,
      //       goalsSet: false,
      //       currentlySetting: 'none',
      //       currentString: 'hi',
      //       weeklyAverage: 0,
      //       dailyAverage: 0,
      //       snacks: -10
      //     }).then(() => {
      //       bot.welcome(sender);
      //       bot.setHealthGoal(sender);
      //     })
      //   }
        // if user exists
      //   else {
      //     if (snapshot.val().goalsSet == false) {
      //       // curr is healthGoal, set it
      //       if (snapshot.val().healthGoal == 0) {
      //
      //         userRef.update({
      //           healthGoal: text
      //         })
      //         bot.setSnackLimit(sender);
      //         // curr is snackLimit, set it
      //       } else if (snapshot.val().snackLimit == 0) {
      //
      //         userRef.update({
      //           snackLimit: text,
      //           goalsSet: true
      //         })
      //         bot.selectOption(sender);
      //     } else { // goalsSet == true, event = Meal or Snack
      //       if (text.toLowerCase() == "Meal") {
      //         userRef.update({
      //           currentlySetting: 'mealname'
      //         })
      //         bot.addMealName(sender);
      //       }
      //
      //       if (snapshot.val().currentlySetting == 'mealname') {
      //         userRef.update({
      //           currentlySetting: 'mealscore'
      //         })
      //         bot.addMealScore(sender, snapshot.val().currentString);
      //       }
      //
      //       if (snapshot.val().currentlySetting == 'mealscore') {
      //         const uid = uuid.v4();
      //         const mealRef = db.ref('users/' + sender + '/meals/' + uid);
      //
      //         //db add object
      //         mealRef.set({
      //           name: payload.name,
      //           score: payload.score
      //         })
      //       }
      //
      //     }
      //
      //   } // end of goals not set
      // } // end of else
            // if (i > 0 && prevMessage.payload.category == "Meal") {
            //   // if previous message is selectOption answer and current message is meal string
            //   if (prevMessage.payload.score == 0) {
            //     bot.addMealScore(sender, text);
            //   }
            // }
            //
            // if (payload != null) {
            //
            //   if (payload.category == null) {
            //     bot.selectOption(sender);
            //
            //   if (payload.category == "Meal") {
            //     if(payload.name == ""){
            //       bot.addMealName(sender);
            //     }
            //     // else if (payload.score == 0){
            //     //   bot.addMealScore(sender, payload.name);
            //     // }
            //     else {
            //       const uid = uuid.v4();
            //       const mealRef = db.ref('users/' + sender + '/meals/' + uid);
            //
            //       //db add object
            //       mealRef.set({
            //         name: payload.name,
            //         score: payload.score
            //       })
            //
            //       //report average score, vs goal
            //
            //     }
            //   }
            //   if (payload.category == "Snack") {
            //     // get value from db, decrement
            //     // if snackCounter <= 0, public shaming
            //   }
            // }
            //
            //   }
      //});

    // postback (e.g. Get Started)
    } else if (event.postback && event.postback.payload) {
      let payload = event.postback.payload;
      bot.sendMessage(sender, {"text":payload})

      if (payload == "<GET_STARTED_PAYLOAD>") {
        bot.getStarted(sender);
      }

    }

     else {
      // Returns a '404 Not Found' if event is not from a page subscription
      res.sendStatus(404);
    }
  }
    // Returns a '200 OK' response to all requests
    res.status(200).send('EVENT_RECEIVED');
});

module.exports = router;
