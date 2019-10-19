const admin = require('firebase-admin')
const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});

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
	    "criterias": {"gender":"F", "smoker":true},
	    "studyName": {"en": "English study name",  "fr": "French study name"}
     }
* */

exports.findsAllUsersEligible = functions.https.onRequest( async (req, res) => {
    let criterias = req.body.criterias;
    let listOfKeys = Object.keys(criterias);
    let tmp_list = db.collection('users');
    for(let item of listOfKeys){
        if (item == "dateOfBirth"){
            // TODO Change operator
        }
        else{
            tmp_list = tmp_list.where(item, "==", criterias[item]);
        }
    }

    const eligibleUsers = await tmp_list.get();
    let listOfEligibleUsers = eligibleUsers.docs.map(value => ({[`${value.id}`]: value.data()}));

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
                ]
        "studyName":{"fr": "Nom de l'étude clinique",
                     "en": "Clinical Study Name"}
    }
* */
// TODO: Put HTML in separate files and add a parameter for the email type.
exports.sendEmail = functions.https.onRequest(async (req, res) => {

    // Go through every email in the list and send email according to prefered language
    await Promise.all(req.body.dest.map( user => {
        const dest = Object.keys(user)[0];
        const language = user[dest].lang;
        cors(req, res, () => {
            // getting dest email by query string
            const englishEmail = `
            <p style="font-size: 16px; font-family: Arial"> We are pleased to inform you that you are eligible for our new 
            clinical trial ${req.body.studyName.en}. For more information or to register please go to the following link:
            <a href="https://www.mhicc-recruiting.org/clinicalStudies/${req.body.studyName.en}">
            https://www.mhicc-recruiting.org/clinicalStudies/${req.body.studyName.en}?lang=en
            </a>
            </p>
            <br />
            <img src="http://www.mhicc.org/images/mhicc_en.gif" />
            <p style="font-size: 16px; font-family: Arial">
            Montreal Health Innovations Coordinating Center <br />
            4100 Molson St., Suite 400 <br />
            Montreal, Quebec H1Y 3N1 <br />
            Tel: 514-461-1300 </p>`;

            const frenchEmail = `
            <p style="font-size: 16px; font-family: Arial"> Nous avons le plaisir de vous annoncer que vous êtes éligible à
            cette nouvelle étude clinique: ${req.body.studyName.fr}. Pour plus d'informations à propos de l'étude 
            clinique ou pour vous y inscrire allez au lien suivant:
            <a href="https://www.mhicc-recruiting.org/clinicalStudies/${req.body.studyName.en}">
            https://www.mhicc-recruiting.org/clinicalStudies/${req.body.studyName.en}?lang=fr
            </a>
            </p>
            <br />
            <img src="http://www.mhicc.org/images/mhicc_fr.gif" />
            <p style="font-size: 16px; font-family: Arial">
            Centre de Coordination des Essais Cliniques de Montréal <br />
            4100 Molson St., Suite 400 <br />
            Montréal, Québec H1Y 3N1 <br />
            Tél: 514–461–1300 </p>`;

            let mailOptions;
            if (language === "en") {
                mailOptions = {
                    from: 'MHICC Recruiting Team <${gmailEmail}>',
                    to: dest,
                    subject: 'Clinical Trial Eligibility', // email subject
                    html: englishEmail// email content in HTML
                };
            } else if (language === "fr") {
                mailOptions = {
                    from: 'Équipe de recrutement de MHICC <${gmailEmail}>',
                    to: dest,
                    subject: 'Éligibilité à une étude clinique', // email subject
                    html: frenchEmail// email content in HTML
                };
            }
            return transporter.sendMail(mailOptions);
        });
    }))
    .catch(reason => {
        console.error(reason);
        res.send(reason);
    });

    return res.send('Sended');
});


/* FUNCTIONS RELATED TO ADMIN ACCESSES INFORMATION*/


