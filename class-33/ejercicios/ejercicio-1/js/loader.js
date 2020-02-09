/**
 * @file Component: loader
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */





/**
 * @function external:loader.add
 * @description Add loading animation.
 * @see Used in:
 * @see - 'geolocation.js' -> {@link external:geolocation.set}
 */
export function add() {
	let loader = document.getElementById("loader");
	if (!loader) {
		let loader = document.createElement("div");
		loader.setAttribute("id", "loader");
		loader.setAttribute("class", "loader");
		document.body.appendChild(loader);
	}
}



/**
 * @function external:loader.remove
 * @description Remove loading animation.
 * @see Used in:
 * @see - 'geolocation.js' -> {@link external:geolocation.set}
 */
export function remove() {
	let loader = document.getElementById("loader");
	if (loader) {
		document.body.removeChild(loader);
	}
}