const admin = require('firebase-admin');
const functions = require('firebase-functions');
admin.initializeApp();
const databaseModule = require('./database.js');
const emailModule = require('./email.js');
const usersModule = require('./users.js');
const clinicalStudiesModule = require('./clinicalStudies.js');
let db = admin.firestore();
const now = admin.firestore.Timestamp.now();

const firestore = require('@google-cloud/firestore');

const bucket = 'gs://mhicc-recruitment.appspot.com';

exports.addInfo = databaseModule.addInfo();
exports.removeInfo = databaseModule.removeInfo();

exports.sendEmail = emailModule.sendEmail();

exports.addUser = usersModule.addUser();
exports.findsAllUsersEligible = usersModule.findsAllUsersEligible();
// exports.updateAge = usersModule.updateAge();

exports.addClinicalStudy = clinicalStudiesModule.addClinicalStudy();
exports.filtersClinicalStudies = clinicalStudiesModule.filtersClinicalStudies();

/*
    Function backups the database every 24 hours. To restore run the following
    gcloud firestore import gs://mhicc-recruitment/{DataToBeRestored}/

    Copy the bucket url from the link:
    https://console.firebase.google.com/u/0/project/mhicc-recruitment/storage/mhicc-recruitment.appspot.com/files
*/

exports.scheduledFirestoreUpdateAge = functions.pubsub
    .schedule('every 24 hours')
    .onRun(async (context) => {
        const usersRef = db.collection('users');
        const allUsers = await usersRef.get();
        console.log(':O');
        console.log(allUsers);
        allUsers.forEach(doc => {
            if (doc.data().birthDate){
                let newAge = now.toDate().getFullYear() - doc.data().birthDate.toDate().getFullYear();
                usersRef.doc(doc.id).update({"age": newAge});
                console.log(doc.id)
            }
        });
    });

const exportData = exports.exportData = function() {
    const client = new firestore.v1.FirestoreAdminClient();
    const databaseName = client.databasePath(process.env.GCP_PROJECT, '(default)');

    return client.exportDocuments({
        name: databaseName,
        outputUriPrefix: bucket,
        collectionIds: []
    })
        .then(responses => {
            const response = responses[0];
            console.log(`Operation Name: ${response['name']}`);
            return response;
        })
        .catch(err => {
            console.error(err);
            throw new Error('Export operation failed');
        });
};

exports.scheduledFirestoreExport = functions.pubsub
    .schedule('every 24 hours')
    .onRun((context) => {
        return exportData();
    });
