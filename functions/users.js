const admin = require('firebase-admin');
const functions = require('firebase-functions');
const _ = require('lodash');

var db = admin.firestore();

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
exports.addUser = () => functions.https.onRequest(async (req, res) => {
    // Verify if email already exists
    let userToBeAdded = await db.collection('users').doc(req.body.email).get()
    if (!userToBeAdded.exists)
    {
        // Add user
        const snapshot = await db.collection('users').doc(req.body.email).set(req.body.userInfo).catch(
            (reason => {
                console.error(reason);
                res.send(reason);
            }));
        console.log(snapshot);
        res.send("The user has been added.");
    }
    else
    {
        res.send("The user already exists.")
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
exports.findsAllUsersEligible = () => functions.https.onRequest( async (req, res) => {
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
