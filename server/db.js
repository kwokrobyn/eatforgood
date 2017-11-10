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
      mealCount: 0,
      totalAverage: 0
    });

  },

  addMeal: (userID, level, mealType) => {
    const date = module.exports.parseDate();
    const mealID = uuid.v4();
    const mealRef = db.ref('users/' + userID + '/meals/' + mealID);
    mealRef.set({
      mealType: mealType,
      healthLevel: parseInt(level),
      date: date
    }).then(() => {
      const userRef = db.ref('users/' + userID);
      userRef.once("value", (snapshot) => {
        const newCount = snapshot.val().mealCount + 1
        const newAve = (snapshot.val().totalAverage * (newCount - 1) + entry)/parseFloat(newCount)
        userRef.update({
          mealCount: newCount,
          totalAverage: newAve
        });
      });
    })

  },

  updateAverage: (userID, entry) => {
    const userRef = db.ref('users/' + userID);
    userRef.once("value", (snapshot) => {
      const newCount = snapshot.val().mealCount + 1
      const newAve = (snapshot.val().totalAverage * (newCount - 1) + entry)/parseFloat(newCount)
      userRef.update({
        mealCount: newCount,
        totalAverage: newAve
      });
    });
  }

  //setMeal: (user, mealObj) => {
  //   const userRef = db.ref('users/' + user.id);
  //   userRef.once("value", (snapshot) => {
  //     userRef.set({
  //       meals: mealObj
  //     });
  //   })
  // }

}
