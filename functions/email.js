const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const fs = require('fs');
const cors = require('cors')({origin: true});

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

exports.sendEmail = () => functions.https.onRequest(async (req, res) => {
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
