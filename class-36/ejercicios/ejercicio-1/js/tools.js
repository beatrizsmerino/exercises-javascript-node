/**
 * @file Tools global
 * @module tool
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */





/**
 * @function module:tool.insertTagScript
 * @description Insert the tag html 'script'.
 * @param {Object} attributeList - Options for customized the script
 * @param {String} attributeList.src - Root of the tag script
 * @param {Object} attributeList.async - Asyncronic download file
 * @param {Object} attributeList.defer - 
 * // https://cybmeta.com/diferencia-async-y-defer
 * @see Used in:
 * @see - 'srcript.js' -> {@link functionAnonimAutoExecuted}
 */
export function insertTagScript(attributeList, callback) {
    const scriptElem = document.createElement("script");

    Object.keys(attributeList).map(key => {
        if (attributeList[key] !== null) {
            scriptElem.setAttribute(key, attributeList[key])
        }
    });

    scriptElem.onload = callback;
    document.getElementsByTagName("head")[0].appendChild(scriptElem);
}