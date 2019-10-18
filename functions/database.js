const admin = require('firebase-admin')
const functions = require('firebase-functions');

admin.initializeApp();
let db = admin.firestore();

/* FUNCTIONS RELATED TO USERS*/

exports.addUser = functions.https.onRequest(async (req, res) => {
    // Verify if email already exists
    userToBeAdded = await db.collection('users').doc(req.query.email).get();
    if (!userToBeAdded.exists)
    {
        // Add user
        const snapshot = await db.collection('users').doc(req.query.email).set({'gender': req.query.gender,
            'birthDate': req.query.birthDate,
            'smoker': req.query.smoker,
            'studyNotification': req.query.studyNotification}).catch((reason => {
            console.error(reason);
            res.send(reason);
        }));
        console.log(snapshot);
        res.send("The user has been added.")
    }
    else
    {
        res.send("The user already exists.")
    }

});

exports.removeUser = functions.https.onRequest(async (req, res) => {
    let docToDelete = await db.collection('users').doc(req.query.email).get();

    if (docToDelete.exists)
    {
        const snapshot = await db.collection('users').doc(req.query.email).delete().catch((reason => {
            console.error(reason);
            res.send(reason);
        }));
        console.log(snapshot);
        res.send("The user has been removed.")
    }
    else
    {
       res.send("This user is not in the database")
    }
});

/* FUNCTIONS RELATED TO CLINICAL STUDIES INFORMATION*/


/* FUNCTIONS RELATED TO ADMIN ACCESSES INFORMATION*/


