const firebase = require('./firebase');
const db = firebase.database();

module.exports = {

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

  //addMeal: (userID, )

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
