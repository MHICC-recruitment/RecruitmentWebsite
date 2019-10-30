const admin = require('firebase-admin');
const functions = require('firebase-functions');
const _ = require('lodash');

let db = admin.firestore();

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
exports.addClinicalStudy = () => functions.https.onRequest(async (req, res) => {
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
// TODO Add geopoint (distance between 2 zip codes)
exports.filtersClinicalStudies = () => functions.https.onRequest( async (req, res) => {
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
