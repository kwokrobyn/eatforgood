const express = require('express')
const token = "EAAXqgZAW0uwoBAJ0ZCtrVdF07EN0ZAx3EeZAWZBQdi4TRvo29qNLZCDiiQurLKuy43mqpkDQrTMMcu1LpcOlYIkpiluUeyPGCKXd9qt644DlsTB168D673TWaezOvcqVmUhgjgAreZC9dT7RjMlllYipxlsDfnq18qD5wpastC6kwZDZD"


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
    let sender = event.sender.id.toString();
    if (event.message && event.message.text) {
      let text = event.message.text
      self.sendText(sender, "Text echo: " + text.substring(0,100))
    } else {
      // Returns a '404 Not Found' if event is not from a page subscription
      res.sendStatus(404);
    }
  }
    // Returns a '200 OK' response to all requests
    res.status(200).send('EVENT_RECEIVED');
});

sendText: (sender, text) => {
  console.log('hi');
  let messageData = {
    text: text
  }

  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
     qs: {
       access_token: token
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


}

module.exports = router;
