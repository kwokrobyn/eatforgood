const express = require('express')
const accesstoken = "EAAXqgZAW0uwoBAJ0ZCtrVdF07EN0ZAx3EeZAWZBQdi4TRvo29qNLZCDiiQurLKuy43mqpkDQrTMMcu1LpcOlYIkpiluUeyPGCKXd9qt644DlsTB168D673TWaezOvcqVmUhgjgAreZC9dT7RjMlllYipxlsDfnq18qD5wpastC6kwZDZD"
const request = require('request')
const db = require('./db')
const firebase = require('./firebase');
const directdb = firebase.database();


module.exports = {

  sendMessage: (sender, messageData) => {

    request({
      url: 'https://graph.facebook.com/v2.6/me/messages',
       qs: {
         access_token: accesstoken
       },
       method: 'POST',
       json: {
         recipient: {
           id: sender
         },
         message: messageData,

       }
     }, (error, response, body) => {
       if (error) {
         console.log('Error sending messages: ', error)
       } else if (response.body.error) {
         console.log('Error: ', response.body.error)
       }
     })
  }, // END OF SENDTEXT

  getStarted: (sender) => {

    let messageData = {
      "text": "Welcome to Eat For Good! Get started by choosing a health goal. (1 = least healthy, 10 = most healthy)",
      "quick_replies": [
        {
          "content_type":"text",
          "title":"1",
          "payload":"<HEALTH_GOAL_POOR>"
        },
        {
          "content_type":"text",
          "title":"2",
          "payload":"<HEALTH_GOAL_POOR>"
        },
        {
          "content_type":"text",
          "title":"3",
          "payload":"<HEALTH_GOAL_POOR>"
        },
        {
          "content_type":"text",
          "title":"4",
          "payload":"<HEALTH_GOAL_POOR>"
        },
        {
          "content_type":"text",
          "title":"5",
          "payload":"<HEALTH_GOAL_OK>"
        },
        {
          "content_type":"text",
          "title":"6",
          "payload":"<HEALTH_GOAL_OK>"
        },
        {
          "content_type":"text",
          "title":"7",
          "payload":"<HEALTH_GOAL_OK>"
        },
        {
          "content_type":"text",
          "title":"8",
          "payload":"<HEALTH_GOAL_GOOD>"
        },
        {
          "content_type":"text",
          "title":"9",
          "payload":"<HEALTH_GOAL_GOOD>"
        },
        {
          "content_type":"text",
          "title":"10",
          "payload":"<HEALTH_GOAL_GOOD>"
        }
      ]
    }
    module.exports.sendMessage(sender, messageData);
  },

  commentPoorGoal: (sender, goal) => {
    let messageData = {
      "text": "You chose " + goal + ". That's setting the bar low..."
    }
    module.exports.sendMessage(sender, messageData);
  },
  commentOkGoal: (sender, goal) => {
    let messageData = {
      "text": "You chose " + goal + ". That's a good start!"
    }
    module.exports.sendMessage(sender, messageData);
  },
  commentGoodGoal: (sender, goal) => {
    let messageData = {
      "text": "You chose " + goal + ". That's the spirit! "
    }
    module.exports.sendMessage(sender, messageData);
  },

  help: (sender) => {
    let messageData = {
      "text": "'add' a meal, 'check' your progress, or simply choose from the options below. ",
      "quick_replies": [
        {
          "content_type":"text",
          "title":"Add a meal",
          "payload":"<ADD_MEAL>"
        },
        {
          "content_type":"text",
          "title":"Check your progress",
          "payload":"<CHECK_PROGRESS>"
        },
        {
          "content_type": "text",
          "title":"Today's meals",
          "payload":"<CHECK_TODAY>"
        },
        {
          "content_type":"text",
          "title":"Cancel",
          "payload":"<CANCEL>"
        }
      ]
    }
    module.exports.sendMessage(sender, messageData);
  },

  addMeal: (sender) => {
    let messageData = {
      "text": "What meal is this?",
      "quick_replies": [
        {
          "content_type":"text",
          "title":"Breakfast",
          "payload":"<ADD_MEAL_BREAKFAST>"
        },
        {
          "content_type":"text",
          "title":"Lunch",
          "payload":"<ADD_MEAL_LUNCH>"
        },
        {
          "content_type":"text",
          "title":"Dinner",
          "payload":"<ADD_MEAL_DINNER>"
        },
        {
          "content_type":"text",
          "title":"Snack",
          "payload":"<ADD_MEAL_SNACK>"
        }
      ]
    }
    module.exports.sendMessage(sender, messageData);
  },

  addMeal1: (sender, mealType) => {
    let reply;

    // customize reply according to mealType
    if (mealType == "Breakfast") {
      reply = "Good morning! You chose Breakfast. How healthy was your meal?"
    } else if (mealType == "Lunch") {
      reply = "Good afternoon! You chose Lunch. How healthy was your meal?"
    } else if (mealType == "Dinner") {
      reply = "Good evening! You chose Dinner. How healthy was your meal?"
    } else if (mealType == "Snack") {
      reply = "Hello! You chose Snack. How healthy was your snack?"
    }

    let messageData = {
      "text": reply,
      "quick_replies": [
        {
          "content_type":"text",
          "title":"1",
          "payload":"<ADD_" + mealType.toUpperCase()+ "_POOR>"
        },
        {
          "content_type":"text",
          "title":"2",
          "payload":"<ADD_" + mealType.toUpperCase()+ "_POOR>"
        },
        {
          "content_type":"text",
          "title":"3",
          "payload":"<ADD_" + mealType.toUpperCase()+ "_POOR>"
        },
        {
          "content_type":"text",
          "title":"4",
          "payload":"<ADD_" + mealType.toUpperCase()+ "_POOR>"
        },
        {
          "content_type":"text",
          "title":"5",
          "payload":"<ADD_" + mealType.toUpperCase()+ "_OK>"
        },
        {
          "content_type":"text",
          "title":"6",
          "payload":"<ADD_" + mealType.toUpperCase()+ "_OK>"
        },
        {
          "content_type":"text",
          "title":"7",
          "payload":"<ADD_" + mealType.toUpperCase()+ "_OK>"
        },
        {
          "content_type":"text",
          "title":"8",
          "payload":"<ADD_" + mealType.toUpperCase()+ "_GOOD>"
        },
        {
          "content_type":"text",
          "title":"9",
          "payload":"<ADD_" + mealType.toUpperCase()+ "_GOOD>"
        },
        {
          "content_type":"text",
          "title":"10",
          "payload":"<ADD_" + mealType.toUpperCase()+ "_GOOD>"
        }
      ]
    }
    module.exports.sendMessage(sender, messageData);
  },

  addMeal2: (sender, level, levelComment, mealType) => {
    let reply;
    if (levelComment == "Poor") {
      reply = "You chose " + level + ". Tsk...you're better than that!"
    } else if (levelComment == "OK") {
      reply = "You chose " + level + ". Not too bad!"
    } else if (levelComment == "Good") {
      reply = "You chose " + level + ". Keep up the good work!"
    }

    let messageData = {
      "text": reply
    }
    module.exports.sendMessage(sender, messageData);
  },

  checkToday: (sender) => {

    db.getMealsOfDay(sender, (result) => {
      var dailyReport = "Here's what you ate today: \n"

      result.forEach((child) => {
        dailyReport += child.val().mealType + " (Score: " + JSON.stringify(child.val().healthLevel) + ")\n"
      })

      let messageData = {
        "text": dailyReport
      }
      module.exports.sendMessage(sender, messageData);
    })

  },

  checkProgress: (sender) => {
    const userRef = directdb.ref('users/' + sender);
    userRef.once("value", (snapshot) => {
      const goal = snapshot.val().healthGoal;
      const curr = snapshot.val().totalAverage;
      var reply = "";
      if (curr > goal) {
        goodArr = [
          "Great Job! You are achieving your goal. Are you sure you’re telling the truth? Don’t you lie to me now.",
          "Nice! You are achieving your goal. Remember not to give up now, I know this isn’t your first time trying a healthy diet.",
          "Awesome! You are achieving your goal. As you are doing well, don’t think you can take it easy. Remember, a moment on the lips, a lifetime on the hips!",
          "Nicely Done! You are achieving your goal. A wise man once told me the difference between a healthy diet and and unhealthy one is the willpower of the individual. Don’t flake out on me now."
        ]
        reply = goodArr[Math.floor(Math.random() * goodArr.length)];
      }
      else if (curr == goal) {
        aveArr = [
          "You are borderline achieving your diet. Don’t give up! Quote of the day: Chocolate cake, is always a mistake!",
          "You are borderline achieving your diet. Enough of these cheat meals and unhealthy snacks, I know you are better than that, you superstar you."
        ]
        reply = aveArr[Math.floor(Math.random() * aveArr.length)];
      }
      else {
        badArr = [
          "You are not achieving your goal. It’s okay, I’m not gonna make life harder for you, I’m sure you’ve already had enough on your plate.",
          "You are not achieving your goal. It’s okay, you are a well-rounded individual. Well-rounded.",
          "You are not achieving your goal. Don’t take it too hard though, I’m sure this isn’t the first time you’ve failed at a healthy lifestyle.",
          "You are not achieving your goal. Please go and take at yourself! Mirrors don’t lie; lucky for you, they don’t laugh either.",
          "You are not achieving your goal. It’s about time I told you that there are more letters in the alphabet than KFC.",
          "You are not achieving your goal. When I said clear all the fattening food in your fridge, I did not mean with your mouth.",
          "You are not achieving your goal. Want that beach bod? Fat hope man. I meant that literally."
        ]
        reply = badArr[Math.floor(Math.random() * badArr.length)];
      }

      let messageData = {
        "text": "Your goal is " + goal + ", your current score is " + curr.toFixed(2) + '\n' + reply 
      }
      module.exports.sendMessage(sender, messageData);
    })
  },

  setSnackLimit: (sender) =>{
      let messageData = {
          "text":"Set a limit to how many snacks you can eat per day!",
          "quick_replies":[
            {
              "content_type":"text",
              "title":"0",
              "payload":"<STRING_SENT_TO_WEBHOOK>"
            },
            {
              "content_type":"text",
              "title":"1",
              "payload":"<STRING_SENT_TO_WEBHOOK>"
            },
            {
              "content_type":"text",
              "title":"2",
              "payload":"<STRING_SENT_TO_WEBHOOK>"
            },
            {
              "content_type":"text",
              "title":"3",
              "payload":"<STRING_SENT_TO_WEBHOOK>"
            },
            {
              "content_type":"text",
              "title":"4",
              "payload":"<STRING_SENT_TO_WEBHOOK>"
            },
            {
              "content_type":"text",
              "title":"5",
              "payload":"<STRING_SENT_TO_WEBHOOK>"
            },
            {
              "content_type":"text",
              "title":"6",
              "payload":"<STRING_SENT_TO_WEBHOOK>"
            },
            {
              "content_type":"text",
              "title":"7",
              "payload":"<STRING_SENT_TO_WEBHOOK>"
            },
            {
              "content_type":"text",
              "title":"8",
              "payload":"<STRING_SENT_TO_WEBHOOK>"
            },
            {
              "content_type":"text",
              "title":"9",
              "payload":"<STRING_SENT_TO_WEBHOOK>"
            },
            {
              "content_type":"text",
              "title":"10",
              "payload":"<STRING_SENT_TO_WEBHOOK>"
            }
          ]
      }
    console.log('showing snack limit')
    module.exports.sendMessage(sender, messageData)
  },

  selectOption: (sender) =>{
      let messageData = {
        "text":"Select the data you want to input",
        "quick_replies":[
          {
            "content_type":"text",
            "title":"Meal",
            "payload": {
              "category": "Meal",
              "name": "",
              "score": 0
            }
          },
          {
            "content_type":"text",
            "title":"Snack",
            "payload": {
              "category": "Snack",
              "name": ""
            }
          }
        ]
      }
    module.exports.sendMessage(sender, messageData)
  },

  addMealName: (sender) => {
    let messageData = {"text":"What did you eat?"}
    module.exports.sendMessage(sender, messageData)
  },

  addMealScore: (sender, mealName) => {
    let messsageData = {
        "text":"Give your meal a health score!",
        "quick_replies":[
          {
            "content_type":"text",
            "title":"0",
            "payload":{"name":mealName, "score":0}
          },
          {
            "content_type":"text",
            "title":"1",
            "payload":{"name":mealName, "score":1}
          },
          {
            "content_type":"text",
            "title":"2",
            "payload":{"name":mealName, "score":2}
          },
          {
            "content_type":"text",
            "title":"3",
            "payload":{"name":mealName, "score":3}
          },
          {
            "content_type":"text",
            "title":"4",
            "payload":{"name":mealName, "score":4}
          },
          {
            "content_type":"text",
            "title":"5",
            "payload":{"name":mealName, "score":5}
          },
          {
            "content_type":"text",
            "title":"6",
            "payload":{"name":mealName, "score":6}
          },
          {
            "content_type":"text",
            "title":"7",
            "payload":{"name":mealName, "score":7}
          },
          {
            "content_type":"text",
            "title":"8",
            "payload":{"name":mealName, "score":8}
          },
          {
            "content_type":"text",
            "title":"9",
            "payload":{"name":mealName, "score":9}
          },
          {
            "content_type":"text",
            "title":"10",
            "payload":{"name":mealName, "score":10}
          }
        ]
      }

    }
}
