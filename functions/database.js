// TODO: Test architecture
// TODO: Backup data
// TODO: Statistics
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const fs = require('fs');
const cors = require('cors')({origin: true});
const now = admin.firestore.Timestamp.now();
const _ = require('lodash');

let db = admin.firestore();

/*
*   This function adds information to an existing collection in the database.
*   POST:
*   collection: users or clinicalStudies
*   document: user's email or study ID
*   userInfo: json containing the information available on the user
*
*   Example
*   {
*       "collection":"users:,
*       "document":"janedoe@gmail.com",
*       "userInfo": {
*                       "diabetes": false,
*                       "studyNotification": false
*                   }
*   }
* */
exports.addInfo = () => functions.https.onRequest(async(req, res) => {
    // Verify user exists
    let doc = await db.collection(req.body.collection).doc(req.body.document).get();
    if (doc.exists)
    {
        const snapshot = await db.collection(req.body.collection).doc(req.body.document).update(req.body.userInfo).catch(
            (reason => {
                console.error(reason);
                res.send(reason);
            }));
        console.log(snapshot);
        res.send("The document info has been added.")
    }
    else
    {
        res.send("The document doesn't exist.")
    }
});

/*
*   This function removes the information related to a specific document (user or clinical study).
*   POST:
*   collection: 'users' or 'clinicalStudies'
*   document: email related to the user's info to be deleted or clinical study ID
*
*   Example
*   {
*       "collection":"users"
*       "document":"janedoe@gmail.com"
*   }
* */
exports.removeInfo = () => functions.https.onRequest(async (req, res) => {
    let docToDelete = await db.collection(req.body.collection).doc(req.body.document).get();

    if (docToDelete.exists)
    {
        const snapshot = await db.collection(req.body.collection).doc(req.body.document).delete().catch((reason => {
            console.error(reason);
            res.send(reason);
        }));
        console.log(snapshot);
        res.send("The document has been removed.")
    }
    else
    {
       res.send("This document is not in the database")
    }
});



