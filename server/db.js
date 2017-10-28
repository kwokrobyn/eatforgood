const firebase = require('./firebase');
const db = firebase.database();

module.exports = {
  getUser: (userID) => {
    const userRef = db.ref('users/'+ userID);
    userRef.once("value", (snapshot) => {
      if (snapshot.val() == null) {
        userRef.set({
          snackLimit: 0,
          healthGoal: 0,
          totalAverage: 0,
          weeklyAverage: 0,
          dailyAverage: 0
          // meals: JSON, only implement when first meal added
          // snacks: JSON, only implement when first snack added
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



}