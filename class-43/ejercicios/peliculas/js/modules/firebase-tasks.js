/**
 * @file firebase-tasks.js
 * @module firebaseTasks
 * @description Firebase TASKS. Conexion data base and CRUD: Create, Read, Update and Delete with Firebase
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */





/**
 * @requires tool
 */
import * as tool from './tools.js';





/**
 * @function module:firebaseTasks.firebaseConexionDataBase
 * @description CONEXION. Initialize Firebase
 * @param {Object} firebaseConfig
 * @see Used in: {@link firebaseTasks}
 */
export function firebaseConexionDataBase(firebaseConfig) {
	const dbConexion = firebase.initializeApp(firebaseConfig);
	console.group("Firebase conexion");
	console.info("Conexion data base: ", dbConexion);
	console.groupEnd();
}



/**
 * @function module:firebaseTasks.firebaseReadOnAdded
 * @description READ. Get all the data from the table when new ones are added to it
 * @param {String} table Name of the table for get the data
 * @param {Function} callbackFunction Name of function that get the data
 * @see Used in: {@link moviesCRUD.getSetFavorites}
 */
export function firebaseReadOnAdded(table, callbackFunction) {
	firebase
		.database()
		.ref(table)
		.on("child_added", (data) => {
			let dataValue = data.val();
			callbackFunction(dataValue);
		});
}



/**
 * @function module:firebaseTasks.firebaseUpdateCounterRecords
 * @description READ. Count records
 * @param {String} table Name of the table for get the data
 * @see Used in: {@link firebaseTasks~firebaseInsert}, {@link firebaseTasks~firebaseUpdate}, {@link firebaseTasks~firebaseDeleteAll},{@link firebaseTasks~firebaseDelete},
 */
export function firebaseUpdateCounterRecords(table) {
	firebase
		.database()
		.ref(`${table}/list`)
		.on("value", function (snapshot) {
			let totalNum = snapshot.numChildren();
			let data = { 'num': totalNum };

			firebase
				.database()
				.ref(`${table}/total`)
				.set(data, (error) => {
					if (error) {
						console.group("Error saving data");
						console.warn(`Error: ${error.code}`);
						console.groupEnd();
					} else {
						console.group("Data saved successfully!");
						console.info("Total records: ", totalNum);
						console.groupEnd();
					}
				});
		});
}



/**
 * @function module:firebaseTasks~firebaseCheckEmpty
 * @description READ. Check if the table is empty by searching for data inside it
 * @param {String} table Name of the parent table
 * @param {String} dataToFind Name of the table that has the data to search
 * @return {Boolean}
 * @see Used in: {@link firebaseTasks~firebaseAddRecordIndex}, {@link firebaseTasks~firebaseCreate}
 */
function firebaseCheckEmpty(table, dataToFind) {
	return firebase
		.database()
		.ref(table)
		.child(dataToFind)
		.once('value')
		.then((snapshot) => {
			if (snapshot.val() === null) {
				return true;
			} else {
				return false;
			}
		});
}



/**
 * @function module:firebaseTasks~firebaseFindRecord
 * @description READ. Find record by his id name and if exist get it
 * @param {String} table Name of the table for get the data
 * @param {Object} record Record to find
 * @return {Object|Boolean}
 * @see Used in: {@link firebaseTasks.firebaseCreate}
 */
function firebaseFindRecord(table, record) {
	return firebase
		.database()
		.ref(table)
		.orderByChild("id")
		.equalTo(record.id)
		.once("value")
		.then((snapshot) => {
			if (snapshot.val() !== null) {
				let recordData = snapshot.val();
				return recordData;
			} else {
				return false;
			}
		});
}



/**
 * @function module:firebaseTasks~firebaseGetLastRecord
 * @description READ. Get the last record inserted
 * @param {String} table Name of the table for get the record
 * @return {Object}
 * @see Use in: {@link firebaseTasks~firebaseAddRecordIndex}
 */
function firebaseGetLastRecord(table) {
	return firebase
		.database()
		.ref(table)
		.orderByChild('timestamp')
		.limitToLast(1)
		.once('value')
		.then((snapshot) => {
			let theLastRecord = snapshot.val();
			console.info(theLastRecord);

			let theLastRecordData;
			snapshot.forEach(item => {
				const dataItem = item.val();
				theLastRecordData = dataItem;
			});

			return theLastRecordData;
		});
}



/**
 * @function module:firebaseTasks~firebaseAddRecordIndex
 * @description CREATE. Create and add the next index to the data
 * @param {String} table Name of the table for get the data
 * @param {Object} data New record to add index before insert it
 * @see Used inside: {@link firebaseTasks~firebaseCheckEmpty}, {@link firebaseTasks~firebaseGetLastRecord}
 * @see Used in: {@link firebaseTasks~firebaseInsert}
 */
async function firebaseAddRecordIndex(table, data) {
	const emptyData = await firebaseCheckEmpty(table, 'list');
	let nextIndex;

	if (emptyData) {
		nextIndex = 1;
	} else {
		const lastRecord = await firebaseGetLastRecord(`${table}/list`);
		const lastRecordIndex = lastRecord.index;
		nextIndex = lastRecordIndex + 1;
	}

	data.index = nextIndex;
}



/**
 * @function module:firebaseTasks~firebaseAddRecordDate
 * @description CREATE. Create and add the current date and the timestamp for to sort
 * @param {Object} data New record to add date before insert it
 * @see Used in: {@link firebaseTasks~firebaseInsert}
 */
function firebaseAddRecordDate(data) {
	data.date = tool.getCurrentDate();
	data.timestamp = JSON.parse(JSON.stringify(new Date()));
}



/**
 * @function module:firebaseTasks~firebaseInsert
 * @description CREATE. Insert new record
 * @param {String} table Table name to insert the new record
 * @param {Object} data New record to add
 * @see Used inside: {@link firebaseTasks~firebaseAddRecordIndex}, {@link firebaseTasks~firebaseAddRecordDate}, {@link firebaseUpdateCounterRecords}
 * @see Used in: {@link firebaseTasks.firebaseCreate}
 */
async function firebaseInsert(table, data) {
	await firebaseAddRecordIndex(table, data);
	firebaseAddRecordDate(data);

	await firebase
		.database()
		.ref(`${table}/list`)
		.push(data, function (error) {
			if (error) {
				console.group("Error saving data");
				console.warn(`Error: ${error.code}`);
				console.groupEnd();
			} else {
				console.group("Data saved successfully!");
				console.info("Data: ", data);
				console.groupEnd();

				firebaseUpdateCounterRecords(table);
			}
		});
}



/**
 * @function module:firebaseTasks.firebaseCreate
 * @description CREATE. Save data if the record already save it
 * @param {String} table Table name to save the new record
 * @param {Object} data New record to save
 * @see Used inside: {@link firebaseTasks~firebaseCheckEmpty}, {@link firebaseTasks~firebaseFindRecord}, {@link firebaseTasks~firebaseInsert}
 * @see Used in: {@link moviesCRUD~saveFavorite}
 */
export async function firebaseCreate(table, data) {
	const emptyData = await firebaseCheckEmpty(table, 'list');

	if (emptyData) {
		firebaseInsert(table, data);
	} else {
		let recordFound = await firebaseFindRecord(`${table}/list`, data);

		if (recordFound) {
			console.group("The data cannot be saved because it already exists!");
			console.info("Data: ", recordFound);
			console.groupEnd();
		} else {
			firebaseInsert(table, data);
		}
	}
}