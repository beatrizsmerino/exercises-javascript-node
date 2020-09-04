/**
 * @file firebase-tasks.js
 * @module firebaseTasks
 * @description Firebase TASKS. Connexion database and CRUD: Create, Read, Update and Delete with Firebase
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */





/**
 * @requires tool
 */
import * as tool from './tools.js';





/**
 * @function module:firebaseTasks.firebaseConnexionDataBase
 * @description CONNEXION. Initialize connection with database of Firebase App
 * @param {Object} firebaseConfig Firebase configuration for access database
 */
export function firebaseConnexionDataBase(firebaseConfig) {
	const dbConnexion = firebase.initializeApp(firebaseConfig);
	console.info("Connection to Firebase Database:", dbConnexion);
}



/**
 * @function module:firebaseTasks.firebaseReadOnValue
 * @description READ. Get all the data from the table and manipulate it with the callback function
 * @param {String} table Table name to get the data
 * @param {Function} callbackFunction Function name to get the data
 * @returns {Object}
 */
export function firebaseReadOnValue(table, callbackFunction) {
	return firebase
		.database()
		.ref(table)
		.once("value")
		.then((snapshot) => snapshot.val())
		.then((data) => callbackFunction(data));
}



/**
 * @function module:firebaseTasks.firebaseReadOnAdded
 * @description READ. When new data is added to the table, get it and manipulate it with the callback function
 * @param {String} table Table name to get the data
 * @param {Function} callbackFunction Function name to get the data
 */
export function firebaseReadOnAdded(table, callbackFunction) {
	firebase
		.database()
		.ref(table)
		.on("child_added", (data) => {
			let dataValue = data.val();
			console.info("Added:", dataValue);
			callbackFunction(dataValue);
		});
}



/**
 * @function module:firebaseTasks.firebaseReadOnRemoved
 * @description READ. When some data is erased to the table, get it and manipulate it with the callback function
 * @param {String} table Table name to get the data
 * @param {Function} callbackFunction Function name to get the data
 */
export function firebaseReadOnRemoved(table, callbackFunction) {
	firebase
		.database()
		.ref(table)
		.on("child_removed", (data) => {
			let dataValue = data.val();
			console.info("Removed:", dataValue);
			callbackFunction(dataValue);
		});
}



/**
 * @function module:firebaseTasks~firebaseCountRecords
 * @description READ. Count records of the table
 * @param {String} table Table name to get the data
 * @return {Object}
 */
function firebaseCountRecords(table) {
	return firebase
		.database()
		.ref(`${table}/list`)
		.once("value")
		.then((snapshot) => snapshot.numChildren());
}



/**
 * @function module:firebaseTasks.firebaseCheckEmpty
 * @description READ. Check if the table is empty by searching for data inside it and return true or false
 * @param {String} table Parent table name
 * @param {String} data Table name that has the data to search
 * @return {Boolean}
 */
export function firebaseCheckEmpty(table, data) {
	return firebase
		.database()
		.ref(table)
		.child(data)
		.once('value')
		.then((snapshot) => (snapshot.val() === null) ? true : false);
}



/**
 * @function module:firebaseTasks~firebaseFindRecord
 * @description READ. Find record by his id name and if exist get it else return false
 * @param {String} table Table name to get the data
 * @param {String} dataId Id name to find
 * @return {Object|Boolean}
 */
function firebaseFindRecord(table, dataId) {
	return firebase
		.database()
		.ref(table)
		.orderByChild("id")
		.equalTo(dataId)
		.once("value")
		.then((snapshot) => (snapshot.val() !== null) ? snapshot.val() : false);
}



/**
 * @function module:firebaseTasks~firebaseGetLastRecordAdded
 * @description READ. Get the last record added
 * @param {String} table Name of the table for get the record
 * @return {Object}
 */
function firebaseGetLastRecordAdded(table) {
	return firebase
		.database()
		.ref(table)
		.orderByChild('timestamp')
		.limitToLast(1)
		.once('value')
		.then((snapshot) => {
			let theLastRecord = snapshot.val();
			console.info("The last record added:", theLastRecord);
			return snapshot;
		})
		.then((snapshot) => {
			let theLastRecordData;

			snapshot.forEach(item => {
				const dataItem = item.val();
				theLastRecordData = dataItem;
			});

			return theLastRecordData;
		});
}



/**
 * @function module:firebaseTasks~firebaseSetRecordIndex
 * @description CREATE. Create and add the next index to the new record
 * @param {String} table Table name to get the data
 * @param {Object} data New record to add index before insert it
 * @see Used inside: {@link module:firebaseTasks.firebaseCheckEmpty}, {@link module:firebaseTasks~firebaseGetLastRecordAdded}
 */
async function firebaseSetRecordIndex(table, data) {
	const emptyData = await firebaseCheckEmpty(table, 'list');
	let nextIndex;

	if (emptyData) {
		nextIndex = 1;
	} else {
		const lastRecord = await firebaseGetLastRecordAdded(`${table}/list`);
		const lastRecordIndex = lastRecord.index;
		nextIndex = lastRecordIndex + 1;
	}

	console.info("The index for the new record:", nextIndex);

	data.index = nextIndex;
}



/**
 * @function module:firebaseTasks~firebaseSetRecordDate
 * @description CREATE. Create and add the current date with format and the timestamp for to sort
 * @param {Object} data New record to add date before insert it
 */
function firebaseSetRecordDate(data) {
	data.date = tool.getCurrentDate();
	data.timestamp = JSON.parse(JSON.stringify(new Date()));
}



/**
 * @function module:firebaseTasks~firebaseInsert
 * @description CREATE. Insert new record
 * @param {String} table Table name to insert the new record
 * @param {Object} data New record to add
 * @see Used inside: {@link module:firebaseTasks~firebaseSetRecordIndex}, {@link module:firebaseTasks~firebaseSetRecordDate}, {@link module:firebaseTasks.firebaseUpdateCounterRecords}
 */
async function firebaseInsert(table, data) {
	await firebaseSetRecordIndex(table, data);
	firebaseSetRecordDate(data);

	await firebase
		.database()
		.ref(`${table}/list`)
		.push(data, function (error) {
			if (error) {
				console.warn("Error saving data! Error code:", error.code);
			} else {
				console.info("Data saved successfully! Data:", data);
				firebaseUpdateCounterRecords(table);
			}
		});
}



/**
 * @function module:firebaseTasks.firebaseCreate
 * @description CREATE. Save data record if it has not been saved yet
 * @param {String} table Table name to save the new record
 * @param {Object} data New record to save
 * @see Used inside: {@link module:firebaseTasks.firebaseCheckEmpty}, {@link module:firebaseTasks~firebaseFindRecord}, {@link module:firebaseTasks~firebaseInsert}
 */
export async function firebaseCreate(table, data) {
	const emptyData = await firebaseCheckEmpty(table, 'list');

	if (emptyData) {
		firebaseInsert(table, data);
	} else {
		let recordFound = await firebaseFindRecord(`${table}/list`, data.id);

		if (recordFound) {
			console.warn("The data cannot be saved because it already exists! Data:", recordFound);
		} else {
			firebaseInsert(table, data);
		}
	}
}



/**
 * @function module:firebaseTasks.firebaseUpdateCounterRecords
 * @description UPDATE. Update the counter records
 * @param {String} table Table name to get the data
 */
export async function firebaseUpdateCounterRecords(table) {
	const totalNum = await firebaseCountRecords(table);
	let data = { 'num': totalNum };

	firebase
		.database()
		.ref(`${table}/total`)
		.update(data, (error) => {
			if (error) {
				console.warn("Error to updated data! Error code:", error.code);
			} else {
				console.info("Data updating successfully! Total records:", totalNum);
			}
		});
}



/**
 * @function module:firebaseTasks.firebaseDeleteAll
 * @description DELETE. Remove all data table
 * @param {String} table Table name to get the data
 */
export async function firebaseDeleteAll(table) {
	await firebase
		.database()
		.ref(`${table}`)
		.remove(function (error) {
			if (error) {
				console.warn("Error to removed all! Error code:", error.code);
			} else {
				console.info("Data removed all successfully! Table:", table);
				firebaseUpdateCounterRecords(table);
			}
		});
}



/**
 * @function module:firebaseTasks.firebaseDelete
 * @description DELETE. Remove record of the table
 * @param {String} table Table name to get the data
 * @param {String} dataId Id name to delete it
 */
export async function firebaseDelete(table, dataId) {
	let recordFound = await firebaseFindRecord(`${table}/list`, dataId);
	let recordKey = Object.keys(recordFound);

	await firebase
		.database()
		.ref(`${table}/list/${recordKey}`)
		.remove(function (error) {
			if (error) {
				console.warn("Error to removed! Error code:", error.code);
			} else {
				console.info("Data removed successfully! Data:", recordFound);
				firebaseUpdateCounterRecords(table);
			}
		});
}