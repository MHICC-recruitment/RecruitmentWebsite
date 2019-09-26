const functions = require('firebase-functions');
const express = require('express');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


exports.helloWorld = functions.https.onRequest((req, res) =>{
    res.send("Hello from Firebase Cloud Functions");
});

// Write into db
exports.insertIntoDB = functions.https.onRequest((req, res) =>{
    const text = req.query.text;
    return admin.database().ref('/test').push({text: text}).then(snapshot => {
        res.redirect(303, snapshot.ref);
        return null
    })
});