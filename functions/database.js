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
*   This function adds information to an existing user in the database.
*   POST:
*   email: user's email
*   userInfo: json containing the information available on the user
*
*   Example
*   {
*       "email":"janedoe@gmail.com",
*       "userInfo": {
*                       "diabetes": false,
*                       "studyNotification": false
*                   }
*   }
* */
exports.addInfoOnUser = functions.https.onRequest(async(req, res) => {
    // Verify user exists
    let user = await db.collection('users').doc(req.body.email).get();
    if (user.exists)
    {
        const snapshot = await db.collection('users').doc(req.body.email).update(req.body.userInfo).catch(
            (reason => {
                console.error(reason);
                res.send(reason);
            }));
        console.log(snapshot);
        res.send("The user info has been added.")
    }
    else
    {
        res.send("The user doesn't exist.")
    }
});

/*
*   This function removes the information related to a specific user.
*   POST:
*   email: email related to the user's info to be deleted
*
*   Example
*   {
*       "email":"janedoe@gmail.com"
*   }
* */
exports.removeUser = functions.https.onRequest(async (req, res) => {
    let docToDelete = await db.collection('users').doc(req.body.email).get();

    if (docToDelete.exists)
    {
        const snapshot = await db.collection('users').doc(req.body.email).delete().catch((reason => {
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

/*
*   This functions verifies and extracts the users eligible according to given criterias.
*   POST:
*   criterias: Json containing the criterias
*   studyName: Json containing the French and English name of the study
*
*   Return: List of all users eligible with their related data.
*
*   Example
*   {
	    "criterias": {"gender":
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
	                     "operator": [">=", "<="]}}
     }
* */

exports.findsAllUsersEligible = functions.https.onRequest( async (req, res) => {
    let criterias = req.body.criterias;
    let listOfKeys = Object.keys(criterias);
    let usersRef = db.collection('users');
    let listOfEligibleUsers = [];
    for(let item of listOfKeys){
        for(let i = 0; i < criterias[item].value.length; i++){
            let usersEligible = usersRef.where(item, criterias[item].operator[i], criterias[item].value[i]);
            const eligibleUsersPromise = await usersEligible.get();
            let tmpList = eligibleUsersPromise.docs.map(value => ({[`${value.id}`]: value.data()}));
            if (listOfEligibleUsers.length === 0){
                listOfEligibleUsers = tmpList;
            }
            else{
                let retainedEmails = _.intersection(listOfEligibleUsers.map(value => Object.keys(value)[0]),
                                                    tmpList.map(value => Object.keys(value)[0]));
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


