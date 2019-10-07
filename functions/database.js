const admin = require('firebase-admin')
const functions = require('firebase-functions');

admin.initializeApp();
let db = admin.firestore();

/* FUNCTIONS RELATED TO USERS*/

exports.addUser = functions.https.onRequest(async (req, res) => {
    const snapshot = await db.collection('users').doc(req.query.email).set({'gender': req.query.gender,
    'birthDate': req.query.birthDate,
    'smoker': req.query.smoker,
    'studyNotification': req.query.studyNotification});
    console.log(snapshot);
    let dataAdded = await db.collection('users').doc(req.query.email).get();
    if (dataAdded.exists)
    {
        res.send("User added");
    }
    else
    {
        res.send("User was not added")
    }

});

exports.removeUser = functions.https.onRequest(async (req, res) => {
    let docToDelete = await db.collection('users').doc(req.query.email).get();

    if (docToDelete.exists)
    {
        const snapshot = await db.collection('users').doc(req.query.email).delete();
        console.log(snapshot);
        res.sendStatus(200);
    }
    else
    {
       res.send("This user is not in the database")
    }
});

/* FUNCTIONS RELATED TO CLINICAL STUDIES INFORMATION*/


/* FUNCTIONS RELATED TO ADMIN ACCESSES INFORMATION*/


