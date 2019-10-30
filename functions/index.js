const admin = require('firebase-admin');
admin.initializeApp();
const databaseModule = require('./database.js');
const emailModule = require('./email.js');
const usersModule = require('./users.js');
const clinicalStudiesModule = require('./clinicalStudies.js');

exports.addInfo = databaseModule.addInfo();
exports.removeInfo = databaseModule.removeInfo();

exports.sendEmail = emailModule.sendEmail();

exports.addUser = usersModule.addUser();
exports.findsAllUsersEligible = usersModule.findsAllUsersEligible();
exports.updateAge = usersModule.updateAge();

exports.addClinicalStudy = clinicalStudiesModule.addClinicalStudy();
exports.filtersClinicalStudies = clinicalStudiesModule.filtersClinicalStudies();