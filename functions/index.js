const admin = require('firebase-admin');
const functions = require('firebase-functions');
admin.initializeApp();
const databaseModule = require('./database.js');
const emailModule = require('./email.js');
const usersModule = require('./users.js');
const clinicalStudiesModule = require('./clinicalStudies.js');

const firestore = require('@google-cloud/firestore');
const client = new firestore.v1.FirestoreAdminClient();

const bucket = 'gs://mhicc-recruitment.appspot.com';

exports.addInfo = databaseModule.addInfo();
exports.removeInfo = databaseModule.removeInfo();

exports.sendEmail = emailModule.sendEmail();

exports.addUser = usersModule.addUser();
exports.findsAllUsersEligible = usersModule.findsAllUsersEligible();
exports.updateAge = usersModule.updateAge();

exports.addClinicalStudy = clinicalStudiesModule.addClinicalStudy();
exports.filtersClinicalStudies = clinicalStudiesModule.filtersClinicalStudies();

/*
    Function backups the database every 24 hours. To restore run the following
    gcloud firestore import gs://mhicc-recruitment/{DataToBeRestored}/

    Copy the bucket url from the link:
    https://console.firebase.google.com/u/0/project/mhicc-recruitment/storage/mhicc-recruitment.appspot.com/files
*/
exports.scheduledFirestoreExport = functions.pubsub
    .schedule('every 24 hours')
    .onRun((context) => {
        exportData();

    });

exports.exportData = async () => {
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