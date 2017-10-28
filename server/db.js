const firebase = require('./firebase');
const db = firebase.database();

module.exports = {
  getUser: (user) => {
    const userRef = db.ref('users/'+ user.id);
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



}
