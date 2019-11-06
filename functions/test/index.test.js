const assert = require('assert');
const chai = require('chai');
const sinon = require('sinon');


const test = require('firebase-functions-test')({
    databaseURL: 'https://mhicc-recruitment.firebaseio.com',
    storageBucket: 'gs://mhicc-recruitment.appspot.com',
    projectId: 'mhicc-recruitment',
}, '/home/andreanne/Downloads/mhicc-recruitment-643b87bbb52a.json');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

describe('Users Functions', () => {
    let indexFunctions;
    let db;
    let now;
    let admin;
    let functions;

    before(() => {
        test.mockConfig({"gmail" : { "email": "email", "password": "password"}});
        indexFunctions = require('../index.js');
        admin = require('firebase-admin');
        db = admin.firestore();
        now = admin.firestore.Timestamp.now();
        functions = require('firebase-functions');
    });

    after(() => {
        // Do cleanup tasks.
        test.cleanup();
    });

    describe('addUser', () => {
        it('addUser should add information to the db', () => {
            const req = {
                body: {
                    "email": "anonymous@gmail.com",
                    "userInfo": {
                        "gender": "F",
                        "smoker": false,
                        "studyNotification": true,
                        "lang": "fr",
                        "birthDate": now
                    }
                }
            };
            
            const res = {
                send: async (body) => {
                    assert.equal(body, "The user has been added.");
                    let userToBeAdded = await db.collection('users').doc(req.body.email).get();
                    assert.equal(userToBeAdded.exists, true);
                }
            };
            // indexFunctions.addUser(req, res);
            indexFunctions.addUser(req, res);
        });
    });
});