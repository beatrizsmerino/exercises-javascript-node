/**
 * @file tools.js
 * @module tool
 * @description Helper functions 
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */





/**
 * @function module:tool.wrap
 * @description Wrap an HTML structure around an element
 * @param {Element} innerDOM Element to wrap
 * @param {String|null} tagWrapper HTML tag of wrapper
 * @param {String|null} classWrapper Class name for the tag of wrapper
 * @param {String|null} idWrapper Id name for the tag of wrapper
 * @returns {Element}
 */
export function wrap(innerDOM, tagWrapper = null, idWrapper = null, classWrapper = null) {
	let wrapperElem;

	// Create element
	if (tagWrapper === null) {
		wrapperElem = document.createElement('div')
	} else {
		wrapperElem = document.createElement(tagWrapper)
	}

	// Add id
	if (idWrapper !== null) {
		wrapperElem.setAttribute("id", idWrapper);
	}

	// Add class
	if (classWrapper !== null) {
		wrapperElem.setAttribute("class", classWrapper);
	}

	innerDOM.parentNode.insertBefore(wrapperElem, innerDOM);
	wrapperElem.appendChild(innerDOM);

	return wrapperElem;
}



/**
 * @function module:tool.getClosest
 * @description Get the parent element with a specific selector
 * @param {Element} childElement Child element
 * @param {String} parentSelector Selector of the parent element
 * @returns {Element|null}
 */
export function getClosest(childElement, parentSelector) {

	// Element.matches() polyfill
	if (!Element.prototype.matches) {
		Element.prototype.matches =
			Element.prototype.matchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector ||
			Element.prototype.oMatchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			function (s) {
				var matches = (this.document || this.ownerDocument).querySelectorAll(s),
					i = matches.length;
				while (--i >= 0 && matches.item(i) !== this) { }
				return i > -1;
			};
	}

	// Get the closest matching element
	for (; childElement && childElement !== document; childElement = childElement.parentNode) {
		if (childElement.matches(parentSelector)) return childElement;
	}
	return null;
};



/**
 * @function module:tool.stringToNode
 * @description Convert a string to node DOM
 * @param {String} String String to convert
 * @return {Element}
 */
export function stringToNode(string) {
	const node = document.createRange().createContextualFragment(string);
	return node;
}



/**
 * @function module:tool~convertNumberWith2Cifres
 * @description Convert 1 digit numbers to 2 digit numbers by adding a leading zero
 * @param {Number} number Number to convert
 * @return {String|Number}
 */
function convertNumberWith2Cifres(number) {
	var numberToString = number.toString();
	var stringLenght = numberToString.length;

	if (stringLenght === 1) {
		var numberConverted = "0" + numberToString;
		return numberConverted;
	} else {
		return number;
	}
}



/**
 * @function module:tool.getCurrentDate
 * @description Get the current date in this format: 'yyyy-mm-dd hh:mm:ss'
 * @returns {String}
 * @see Used inside: {@link module:module:tool~convertNumberWith2Cifres}
 */
export function getCurrentDate() {
	let today = new Date();
	let year = today.getFullYear();
	let month = today.getMonth() + 1;
	let day = today.getDate();
	let hour = today.getHours();
	let minute = today.getMinutes();
	let second = today.getSeconds();

	month = convertNumberWith2Cifres(month);
	day = convertNumberWith2Cifres(day);
	hour = convertNumberWith2Cifres(hour);
	minute = convertNumberWith2Cifres(minute);
	second = convertNumberWith2Cifres(second);

	let date = `${year}-${month}-${day}`;
	let time = `${hour}:${minute}:${second}`;

	let dateTime = `${date} ${time}`;

	console.info("Current date: ", dateTime);
	return dateTime;
}