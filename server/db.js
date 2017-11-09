const firebase = require('./firebase');
const db = firebase.database();

module.exports = {

  insertUser: (userID, goal) => {
    // get reference for user from db
    const userRef = db.ref('users/'+ userID);
    userRef.set({
      healthGoal: goal,
      totalAverage: 0,
      weeklyAverage: 0,
      dailyAverage: 0
    });

  },

  getUser: (userID) => {
    const userRef = db.ref('users/'+ userID);
    userRef.once("value", (snapshot) => {
      if (snapshot.val() == null) {
        userRef.set({
          snackLimit: 0,
          healthGoal: 0,
          totalAverage: 0,
          weeklyAverage: 0,
          dailyAverage: 0,
          meals: [{"name": "", "score": 0}], // need to add new
          snacks: -10
        })
        return -1;
      } else {
        return 1;
      }
    })
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
