
// const admin = require('firebase-admin')
// const functions = require('firebase-functions');
//
// admin.initializeApp();
// let db = admin.firestore();

// // // Create and Deploy Your First Cloud Functions
// // // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.addUser = functions.https.onRequest(async (req, res) => {
//   await db.collection('users').doc(req.query.email).set({gender:'F'});
//   res.sendStatus(200);
// });



/* Example of promises:
admin.firestore().doc('').get();
.then(snapshot => {
    const data = snapshot.data();
    response.send(data)
});
.catch(error => {
    // Handle error
    console.log(error);
    response.status(500).send(error);
});
 */
// .then(snapshot => {
//  return console.log(snapshot)
// })
//     .catch(error => {
//      return console.log(error);
//     });