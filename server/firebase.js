const firebase = require('firebase');

const config = {
    apiKey: "AIzaSyAPIo5UfVSM2y6XjQjy11XRvTmSR5sflnE",
    authDomain: "eatforgoodduke.firebaseapp.com",
    databaseURL: "https://eatforgoodduke.firebaseio.com",
    projectId: "eatforgoodduke",
    storageBucket: "eatforgoodduke.appspot.com",
    messagingSenderId: "718667572959"
  };

firebase.initializeApp(config);

module.exports = firebase;
