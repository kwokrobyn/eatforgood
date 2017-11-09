const express = require('express')
const accesstoken = "EAAXqgZAW0uwoBAJ0ZCtrVdF07EN0ZAx3EeZAWZBQdi4TRvo29qNLZCDiiQurLKuy43mqpkDQrTMMcu1LpcOlYIkpiluUeyPGCKXd9qt644DlsTB168D673TWaezOvcqVmUhgjgAreZC9dT7RjMlllYipxlsDfnq18qD5wpastC6kwZDZD"
const request = require('request')


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
  }


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
