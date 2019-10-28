const admin = require('firebase-admin');
const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const fs = require('fs');
const cors = require('cors')({origin: true});
const now = admin.firestore.Timestamp.now();
const _ = require('lodash');

admin.initializeApp();
let db = admin.firestore();

/* FUNCTIONS RELATED TO USERS*/

/*
*   This function adds a user to the database.
*   POST:
*   email: user's email
*   userInfo: json containing the information available on the user
*
*   Example
*   {
*       "email":"janedoe@gmail.com",
*       "userInfo": {
*                       "gender": "F",
*                       "smoker": false,
*                       "studyNotification": true,
*                       "lang": "fr",
*                   }
*   }
* */
exports.addUser = functions.https.onRequest(async (req, res) => {
    // Verify if email already exists
    let userToBeAdded = await db.collection('users').doc(req.body.email).get();
    if (!userToBeAdded.exists)
    {
        // Add user
        const snapshot = await db.collection('users').doc(req.body.email).set(req.body.userInfo).catch(
            (reason => {
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

exports.updateAge = functions.https.onRequest(async (req, res) => {
    const usersRef = db.collection('users');
    const allUsers = await usersRef.get();
    allUsers.forEach(doc => {
                if (doc.data().birthDate){
                    let newAge = now.toDate().getFullYear() - doc.data().birthDate.toDate().getFullYear();
                    usersRef.doc(doc.id).update({"age": newAge});
                }
            });
    res.send("Age updated")
});

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
exports.addInfoInDatabase = functions.https.onRequest(async(req, res) => {
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
exports.removeUser = functions.https.onRequest(async (req, res) => {
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

/*
*   This functions verifies and extracts the users eligible according to given criteria.
*   POST:
*   criteria: Json containing the criteria
*
*   Return: List of all users eligible with their related data.
*
*   Example
*   {
	    "criteria": {"gender":
	                    {"value": ["F"],
	                     "operator": ["=="]},
	                   "studyNotification":
	                    {"value": [true],
	                     "operator": ["=="]},
	                   "smoker":
	                    {"value": [true],
	                     "operator": ["=="]},
	                    "age":
	                    {"value": [18, 45],
	                     "operator": [">=", "<="]}},
	    "collection": "users"
     }
* */

exports.findsAllUsersEligible = functions.https.onRequest( async (req, res) => {
    let criteria = req.body.criteria;
    let listOfKeys = Object.keys(criteria);
    let usersRef = db.collection('users');
    let listOfEligibleUsers = [];
    for(let item of listOfKeys){
        for(let i = 0; i < criteria[item].value.length; i++){
            const eligibleUsersPromise = await usersRef.where(item, criteria[item].operator[i], criteria[item].value[i]).get();
            let tmpList = eligibleUsersPromise.docs.map(value => ({[`${value.id}`]: value.data()}));
            // Initialize list
            if (listOfEligibleUsers.length === 0){
                listOfEligibleUsers = tmpList;
            }
            else{
                // Keep intersection of both lists
                let retainedEmails = _.intersection(listOfEligibleUsers.map(value => Object.keys(value)[0]),
                                                    tmpList.map(value => Object.keys(value)[0]));
                // Return whole data on each user
                listOfEligibleUsers = tmpList.map(user => {
                    if (retainedEmails.includes(Object.keys(user)[0])) {
                        return user;
                    }
                    return null;
                }).filter(email => email!==null)
            }
        }
    }

    res.send(listOfEligibleUsers)

});



/* FUNCTIONS RELATED TO CLINICAL STUDIES INFORMATION*/
/*
*   This function adds a study to the database. Every study has a unique ID.
*   POST:
*   info: json containing the information available on the study
*
*   Example
*   {
*       "info": {
*                   "studyName": "Name",
*                   "information": Information about the study
*               }
*   }
* */
exports.addClinicalStudy = functions.https.onRequest(async (req, res) => {
    // Verify if clinical study already exists
    let clinicalStudyIDs = db.collection("clinicalStudies");
    let lastStudy = await clinicalStudyIDs.orderBy("id", "desc").limit(1).get();
    let newDataId = lastStudy.docs[0].data().id + 1;

    Number.prototype.pad = function(size) {
        var s = String(this);
        while (s.length < (size || 2)) {s = "0" + s;}
        return s;
    };
    let studyName = `study${(newDataId).pad(4)}`;
    // Add clinical study
    req.body.info.id = newDataId;
    const snapshot = await db.collection('clinicalStudies').doc(studyName).set(req.body.info).catch(
            (reason => {
            console.error(reason);
            res.send(reason);
        }));
    console.log(snapshot);
    res.send("The clinical study has been added.")

});


/*
*   This functions extracts clinical study IDs respecting given criteria.
*   POST:
*   criteria: Json containing the criteria
*
*   Return: List of clinical study IDs respecting criteria.
*
*   Example
*   {
	    "criteria": {"gender": "F", "age": 18}
     }
*/
exports.filtersClinicalStudies = functions.https.onRequest( async (req, res) => {
    let criteria = req.body.criteria;
    let listOfKeys = Object.keys(criteria);
    let studiesRef = db.collection('clinicalStudies');
    let listOfEligibleStudies = [];
    for(let item of listOfKeys){
        let tmpList = [];
        if (item === 'age'){
            const studiesPromise = await studiesRef.get();
            studiesPromise.forEach( doc => {
                if (doc.data().age){
                    let ageRange = doc.data().age;
                    if (criteria[item] >= ageRange[0] && criteria[item] <= ageRange[1]){
                        tmpList.push(doc.id);
                    }
                }
            })
        }
        else{
            const studiesEligible = await studiesRef.where(item, '==', criteria[item]).get();
            tmpList = studiesEligible.docs.map(value => ({[`${value.id}`]: value.data()}));
        }
        // Initialize list
        if (listOfEligibleStudies.length === 0){
            listOfEligibleStudies = tmpList;
        }
        else{
            // Keep intersection of both lists
            listOfEligibleStudies = _.intersection(listOfEligibleStudies.map(value => Object.keys(value)[0]),
                                                   tmpList.map(value => Object.keys(value)[0]));
        }
    }

    res.send(listOfEligibleStudies)
});


/* FUNCTIONS RELATED TO EMAIL SENDING */
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailEmail,
        pass: gmailPassword
    }
});

/*
*  This function sends an email to a user to inform they are eligible to a new clinical study.
*   POST:
*   dest: list of users. FindAllUsersEligible returns this type of list
*   studyName: json containing the french and english name of the study
*   email: json containing the type of email (choice between: 'eligibility') and the object in each language
*
*   Example
*   {
        "dest":[
                    {
                        "andreanne.lemay97@gmail.com": {
                            "smoker": true,
                            "studyNotification": false,
                            "lang": "en",
                            "gender": "F"
                        }
                    },
                    {
                        "andreanne.lemay97@hotmail.com": {
                            "smoker": true,
                            "studyNotification": true,
                            "lang": "fr",
                            "gender": "F"
                        }
                    }
                ],
	"studyName":{"fr": "Perte de cheveux chez les femmes",
				 "en": "Female Hair Loss"},
	"email": {
            	"type": "elibility",
                "object": {
                			"fr": "Éligibilité à une étude clinique",
                        	"en": "Clinical Trial Eligibility"
                		  }
                 }
    }
* */
exports.sendEmail = functions.https.onRequest(async (req, res) => {

    // Go through every email in the list and send email according to prefered language
    await Promise.all(req.body.dest.map( user => {
        const dest = Object.keys(user)[0];
        const language = user[dest].lang;
        cors(req, res, () => {
            // getting email type with language
            const englishEmail = fs.readFileSync(`email_templates/${req.body.email.type}EN.html`);
            const frenchEmail = fs.readFileSync(`email_templates/${req.body.email.type}FR.html`);

            let mailOptions;
            if (language === "en") {
                mailOptions = {
                    from: 'MHICC Recruiting Team <${gmailEmail}>',
                    to: dest,
                    subject: req.body.email.object.en, // email subject
                    html: eval(englishEmail.toString())// email content in HTML
                };
            } else if (language === "fr") {
                mailOptions = {
                    from: 'Équipe de recrutement de MHICC <${gmailEmail}>',
                    to: dest,
                    subject: req.body.email.object.fr, // email subject
                    html: eval(frenchEmail.toString())// email content in HTML
                };
            }
            return transporter.sendMail(mailOptions);
        });
    }))
    .catch(reason => {
        console.error(reason);
        res.send(reason);
    });

    return res.send('Sent');
});


/* FUNCTIONS RELATED TO ADMIN ACCESSES INFORMATION*/


