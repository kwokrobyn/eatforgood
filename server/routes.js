const express = require('express')
const accesstoken = "EAAXqgZAW0uwoBAJ0ZCtrVdF07EN0ZAx3EeZAWZBQdi4TRvo29qNLZCDiiQurLKuy43mqpkDQrTMMcu1LpcOlYIkpiluUeyPGCKXd9qt644DlsTB168D673TWaezOvcqVmUhgjgAreZC9dT7RjMlllYipxlsDfnq18qD5wpastC6kwZDZD"
const request = require('request')
const bot = require('./bot')

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
    if (event.message && event.message.text) {
      let text = event.message.text;
      let payload = event.message.payload;

      // get referene for user from db
      const userRef = db.ref('users/'+ sender);

      userRef.once("value", (snapshot) => {
        // if user does not exist
        if (snapshot.val() == null) {
          userRef.set({
            snackLimit: 0,
            healthGoal: 0,
            totalAverage: 0,
            weeklyAverage: 0,
            dailyAverage: 0,
            meals: [], //need to append
            snacks: -10
          }).then(() => {
            bot.welcome(sender);
            bot.setHealthGoal(sender);
          })
        }

        // if user exists
        else {
          // curr is healthGoal, set it
          if (snapshot.val().healthGoal == 0) {
            userRef.update({
              healthGoal: text
            })
            bot.setSnackLimit(sender);
            // curr is snackLimit, set it
          } else if (snapshot.val().snackLimit == 0) {

            userRef.update({
              snackLimit: text
            })
            bot.selectOption(sender);

          } else {

            if (payload != null) {
              if (payload.category == null) {
                bot.selectOption(sender);
                continue
              if (payload.category == "Meal") {
                if(payload.name == ""){
                  //add name
                  continue
                }
                else if (payload.score == 0){
                  //add score
                  continue
                }
                else {
                  //db add object
                  //report average score, vs goal
                  continue
                }
              }
              if (payload.category == "Snack") {
                // get value from db, decrement
                // if snackCounter <= 0, public shaming
              }
            }
              }
            }
          }

        }

      });


    } else {
      // Returns a '404 Not Found' if event is not from a page subscription
      res.sendStatus(404);
    }
  }


    // Returns a '200 OK' response to all requests
    res.status(200).send('EVENT_RECEIVED');
});

module.exports = router;
