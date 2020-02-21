/**
 * @file Tools global
 * @module tool
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */





/**
 * @function module:tool.insertTagScript
 * @description Insert the tag html 'script'.
 * @param url - Root of the tag script
 * @see Used in:
 * @see - 'srcript.js' -> {@link functionAnonimAutoExecuted}
 */
export function insertTagScript(url) {
    const scriptElem = document.createElement("script");
    scriptElem.setAttribute("src", url);
    scriptElem.setAttribute("async", "");
    scriptElem.setAttribute("defer", "");

    const tag = document.getElementsByTagName("head")[0].appendChild(scriptElem);
    if (tag) {
        return true;
    } else {
        return false;
    }
}