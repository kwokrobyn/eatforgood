const express = require('express')
const accesstoken = "EAAXqgZAW0uwoBAJ0ZCtrVdF07EN0ZAx3EeZAWZBQdi4TRvo29qNLZCDiiQurLKuy43mqpkDQrTMMcu1LpcOlYIkpiluUeyPGCKXd9qt644DlsTB168D673TWaezOvcqVmUhgjgAreZC9dT7RjMlllYipxlsDfnq18qD5wpastC6kwZDZD"
const request = require('request')


module.exports = {

  sendMessage: (sender, messageData) => {
    console.log('hi');

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

  welcome: (sender) => {
      let welctext = "Hi, I'm world-renowned nutrionist and health guru, Scott Heng! \
                  I'm here to help you reach your goal of being a healthy eater! \
                  We'll be keeping track of your meals every day, and you will \
                  grade each of your meals on how healthy they are, on a scale from \
                  1 to 10, with 1 being extremely unhealthy, like deep fried ice cream, \
                  and 10 being extremely healthy, like an organic, free-range, non-GMO salad without dressing!"
      sendMessage(sender, welcMsgData)
    },

    setHealthGoal: (sender) =>{
        let messageData = {
            "text":"Select your health goal, with 1 being the least healthy, and 10 being the most healthy!",
            "quick_replies":[
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
      sendMessage(sender, messageData)
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
      sendMessage(sender, messageData)
    }
}
