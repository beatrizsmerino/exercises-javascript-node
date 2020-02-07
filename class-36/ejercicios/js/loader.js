/**
 * @file Canvas: Temperature and humidity evolution graph based on the weather forecast using the Open Weather Map API
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */





// LOADER
//////////////////////////////////

/**
 * @function add
 * @description Add loading animation.
 * @see Used in: {@link }
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
 * @function remove
 * @description Remove loading animation.
 * @see Used in: {@link }
 */
export function remove() {
	let loader = document.getElementById("loader");
	if (loader) {
		document.body.removeChild(loader);
	}
}