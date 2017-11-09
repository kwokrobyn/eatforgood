const firebase = require('./firebase');
const db = firebase.database();
const uuid = require('uuid');

module.exports = {

  parseDate: () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();
    if(dd<10){
      dd='0'+dd;
    }
    if(mm<10){
      mm='0'+mm;
    }
    var today = dd+'/'+mm+'/'+yyyy;
    return today;
  },

  insertUser: (userID, goal) => {
    // get reference for user from db
    const userRef = db.ref('users/'+ userID);
    userRef.set({
      healthGoal: parseInt(goal),
      totalAverage: 0,
      weeklyAverage: 0,
      dailyAverage: 0
    });

  },

  addMeal: (userID, level, mealType) => {
    const date = module.exports.parseDate();
    const mealID = uuid.v4();
    const mealRef = db.ref('users/' + userID + '/' + date + '/' + mealID);
    dayRef.set({
      mealType: mealType,
      healthLevel: level
    });
  },

  setSnackLimit: (user, snackLimit) => {
    const userRef = db.ref('users/' + user.id);
    userRef.once("value", (snapshot) => {
      userRef.set({
        snackLimit: snackLimit
      });
    })
  },

  setHealthGoal: (user, healthGoal) => {
    const userRef = db.ref('users/' + user.id);
    userRef.once("value", (snapshot) => {
      userRef.set({
        healthGoal: healthGoal
      });
    })
  }

  // setMeal: (user, mealObj) => {
  //   const userRef = db.ref('users/' + user.id);
  //   userRef.once("value", (snapshot) => {
  //     userRef.set({
  //       meals: mealObj
  //     });
  //   })
  // }
  //
  // updateSnack: (user, snackCount) => {
  //   const userRef = db.ref('users/' + user.id);
  //   userRef.once("value", (snapshot) => {
  //     userRef.set({
  //       snackCount
  //     })
  //   })
  // }

}
