const express = require('express')
const accesstoken = "EAAXqgZAW0uwoBAJ0ZCtrVdF07EN0ZAx3EeZAWZBQdi4TRvo29qNLZCDiiQurLKuy43mqpkDQrTMMcu1LpcOlYIkpiluUeyPGCKXd9qt644DlsTB168D673TWaezOvcqVmUhgjgAreZC9dT7RjMlllYipxlsDfnq18qD5wpastC6kwZDZD"
const request = require('request')
const bot = require('./bot')
const db = require('./db')
const uuid = require('uuid')

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

  // although this is an array, it only contains one message
  for (let i = 0; i < messaging_events.length; i++) {
    let event = req.body.entry[0].messaging[i]
    let sender = event.sender.id;

    // normal text
    if (event.message && event.message.text) {
      let text = event.message.text;
      let payload = event.message.payload;

      // quick reply
      if (event.message.quick_reply) {
        let payload = event.message.quick_reply.payload;

        if (payload == "<ADD_MEAL>") {
          bot.addMeal(sender);
        }

        if (payload == "<CHECK_PROGRESS>") {
          bot.checkProgress(sender);
        }


        // Get Started: Init Health Goal
        // - inserts user with health goal in DB
        // - replies with comment based on set health goal
        if (payload == "<HEALTH_GOAL_POOR>") {
          // snarky comment on the Goal
          bot.commentPoorGoal(sender, text)
          // insert user into DB with health Goal
          db.insertUser(sender, text);
        }
        if (payload == "<HEALTH_GOAL_OK>") {
          bot.commentOkGoal(sender, text)
          db.insertUser(sender, text);
        }
        if (payload == "<HEALTH_GOAL_GOOD>") {
          bot.commentGoodGoal(sender, text)
          db.insertUser(sender, text);
        }


        // ADD MEAL 1: received meal type, to prompt for health level
        if (payload == "<ADD_MEAL_BREAKFAST>") {
          bot.addMeal1(sender, "Breakfast");
        }
        if (payload == "<ADD_MEAL_LUNCH>") {
          bot.addMeal1(sender, "Lunch");
        }
        if (payload == "<ADD_MEAL_DINNER>") {
          bot.addMeal1(sender, "Dinner");
        }
        if (payload == "<ADD_MEAL_SNACK>") {
          bot.addMeal1(sender, "Snack");
        }


        // ADD MEAL 2: received health level
        // - add meal + healthLevel to DB
        // - replies with comment based on health level
        if (payload == "<ADD_BREAKFAST_POOR>") {
          bot.addMeal2(sender, text, "Poor", "Breakfast")
          db.addMeal(sender, text, "Breakfast");
        } else if (payload == "<ADD_LUNCH_POOR>") {
          bot.addMeal2(sender, text, "Poor", "Lunch")
          db.addMeal(sender, text, "Lunch");
        } else if (payload == "<ADD_DINNER_POOR>") {
          bot.addMeal2(sender, text, "Poor", "Dinner")
          db.addMeal(sender, text, "Dinner");
        } else if (payload == "<ADD_SNACK_POOR>") {
          bot.addMeal2(sender, text, "Poor", "Snack")
          db.addMeal(sender, text, "Snack");
        } else if (payload == "<ADD_BREAKFAST_OK>") {
          bot.addMeal2(sender, text, "OK", "Breakfast")
          db.addMeal(sender, text, "Breakfast");
        } else if (payload == "<ADD_LUNCH_OK>") {
          bot.addMeal2(sender, text, "OK", "Lunch")
          db.addMeal(sender, text, "Lunch");
        } else if (payload == "<ADD_DINNER_OK>") {
          bot.addMeal2(sender, text, "OK", "Dinner")
          db.addMeal(sender, text, "Dinner");
        } else if (payload == "<ADD_SNACK_OK>") {
          bot.addMeal2(sender, text, "OK", "Snack")
          db.addMeal(sender, text, "Snack");
        } else if (payload == "<ADD_BREAKFAST_GOOD>") {
          bot.addMeal2(sender, text, "Good", "Breakfast")
          db.addMeal(sender, text, "Breakfast");
        } else if (payload == "<ADD_LUNCH_GOOD>") {
          bot.addMeal2(sender, text, "Good", "Lunch")
          db.addMeal(sender, text, "Lunch");
        } else if (payload == "<ADD_DINNER_GOOD>") {
          bot.addMeal2(sender, text, "Good", "Dinner")
          db.addMeal(sender, text, "Dinner");
        } else if (payload == "<ADD_SNACK_GOOD>") {
          bot.addMeal2(sender, text, "Good", "Snack")
          db.addMeal(sender, text, "Snack");
        }

      // quick replies end
    } else if (text.toLowerCase().includes("meal") || (text.toLowerCase().includes("add") && (text.split(" ")).length !== 3)) {
        bot.addMeal(sender);
      } else if (text.toLowerCase().includes("check")) {
        bot.checkProgress(sender);
      // unable to read, prompt user for appropriate text
    } else if ((text.split(" ")).length === 3 ) {
        const textArray = text.split(" ");
        if (textArray[0].toLowerCase() === "add") {
          let mealType = "NONE";
          if (textArray[1].toLowerCase() === "breakfast") {
            let mealType = "Breakfast";
          } else if (textArray[1].toLowerCase() === "lunch") {
            let mealType = "Lunch";
          } else if (textArray[1].toLowerCase() === "dinner") {
            let mealType = "Dinner";
          } else if (textArray[1].toLowerCase() === "snack") {
            let mealType = "Snack";
          }

          if (mealType != "NONE") {
            let level = parseInt(textArray[2])
            if (level <= 4) {
              bot.addMeal2(sender, text, "Poor", mealType)
              db.addMeal(sender, text, mealType);
            } else if (level >= 5 && level <= 7) {
              bot.addMeal2(sender, text, "OK", mealType)
              db.addMeal(sender, text, mealType);
            } else {
              bot.addMeal2(sender, text, "Good", mealType)
              db.addMeal(sender, text, mealType);
            }
          }
        }
      } else {
        bot.help(sender);
      }
    // postback (e.g. Get Started)
    } else if (event.postback && event.postback.payload) {
      let payload = event.postback.payload;

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
