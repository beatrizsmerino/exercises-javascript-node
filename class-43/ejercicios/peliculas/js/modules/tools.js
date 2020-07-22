/**
 * @file tools.js
 * @module tool
 * @description Helper functions 
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */




/**
 * @function wrap
 * @description Wrap an HTML structure around an element
 * @param {Element} innerDOM 
 * @param {String|null} tagWrapper
 * @param {String|null} classWrapper
 * @param {String|null} idWrapper
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