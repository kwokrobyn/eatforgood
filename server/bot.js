const express = require('express')
const accesstoken = "EAAXqgZAW0uwoBAJ0ZCtrVdF07EN0ZAx3EeZAWZBQdi4TRvo29qNLZCDiiQurLKuy43mqpkDQrTMMcu1LpcOlYIkpiluUeyPGCKXd9qt644DlsTB168D673TWaezOvcqVmUhgjgAreZC9dT7RjMlllYipxlsDfnq18qD5wpastC6kwZDZD"
const request = require('request')


module.exports = {

  sendText: (sender, text) => {
    console.log('hi');
    let messageData = {
      text: text
    }

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

  


}
