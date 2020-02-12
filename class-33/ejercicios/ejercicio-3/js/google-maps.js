/**
 * @file
 * @module googleMaps
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */





/**
 * @see {@link ./js/google-maps-config.js}
 */
import * as googleMaps from './google-maps-config.js';


/**
 * @see {@link ./js/snazzymaps.js}
 */
import * as snazzymaps from './snazzymaps.js';





/**
 * @function module:googleMaps.insertTagScript
 * @description Insert the tag html 'script' with the root of the 'API Google Maps'.
 * @see Used inside:
 * @see - 'google-maps-config.js' -> {@link module:googleMaps.API}, {@link module:googleMaps.API_KEY_MAP}
 * @see Used in:
 * @see - 'srcript.js' -> {@link functionAnonimAutoExecuted}
 */
export function insertTagScript() {
	const scriptElem = document.createElement("script");
	scriptElem.setAttribute("src", `${googleMaps.API}js?key=${googleMaps.API_KEY_MAP}`);
	scriptElem.setAttribute("async", "");
	scriptElem.setAttribute("defer", "");

	document.getElementsByTagName("body")[0].appendChild(scriptElem);
}



/**
 * @function module:googleMaps.setMap
 * @description Create a map with the 'API Google Maps'.
 * This map is customized with styles of 'snazzymaps.com'.
 * It has a unique animated marker with an information window that appears when you click on it.
 * @param {Object} coords - Coordinates
 * @param {Object} coords.latitude - Coordinates: latitude
 * @param {Object} coords.longitude - Coordinates: longitude
 * @see Used inside:
 * @see - 'google-maps.js' -> {@link setMap.initMap}, {@link setMap.addMarker}, {@link setMap.addInfoMarker}, {@link setMap.toggleBounceMarker}
 * @see - 'google-maps-config.js' -> {@link module:googleMaps.API}, {@link module:googleMaps.API_KEY_MAP}
 * @see - 'snazzymaps.js' -> {@link module:snazzymaps.mapStyles}
 * @see Used in:
 * @see - 'geolocation.js' -> {@link module:geolocation.set}
 */
export function setMap(coords) {
	const mapDom = document.getElementById("googleMapsMap");
	mapDom.innerHTML = "";

	/**
	 * @function setMap.initMap
	 * @description Init map with coordinates and a marker
	 * @param {Object} jsonStyles - Styles for the map
	 */
	function initMap(jsonStyles) {
		const location = {
			lat: coords.latitude,
			lng: coords.longitude
		};

		const map = new google.maps.Map(mapDom, {
			center: location,
			zoom: 16,
			styles: jsonStyles
		});

		const infoMarker = `
			<div class="marker">
				<h3 class="marker__title">
					Currrent location:
				</h3>
				<p class="marker__text">
					<strong class="marker__strong">Latitude:</strong> ${location.lat}
					<br>
					<strong class="marker__strong">Longitude:</strong> ${location.lng}
				</p>
			</div>
		`;
		addMarker(infoMarker, location, map);
	}

	/**
	* @function setMap.addMarker
	* @description Create a marker
	* @param {String} contentMarker - Text of the marker
	* @param {Object} location - Coordinates
	* @param {Object} map - Map
	*/
	function addMarker(contentMarker = null, location, map) {
		const iconMarker = {
			url: './img/location.png', // url
			scaledSize: new google.maps.Size(50, 50), // scaled size
			// origin: new google.maps.Point(0, 0), // origin
			// anchor: new google.maps.Point(0, 0) // anchor
		};

		const marker = new google.maps.Marker({
			map,
			position: location,
			icon: iconMarker,
			title: "My Geolocation",
			draggable: true,
			animation: google.maps.Animation.DROP,
		});

		if (contentMarker !== null) {
			addInfoMarker(marker, contentMarker, map);
			setTimeout(function () {
				toggleBounceMarker(marker);
			}, 3000);
		}
	}

	/**
	* @function setMap.addInfoMarker
	* @description Add content to the maker
	* @param {Object} marker - Marker of the map
	* @param {String} contentMarker - Text of the marker
	* @param {Object} map - Map
	*/
	function addInfoMarker(marker, contentMarker, map) {
		const infowindow = new google.maps.InfoWindow({
			content: contentMarker
		});

		/**
		 * @event click
		 */
		marker.addListener('click', () => {
			infowindow.open(map, marker);
		});
	}

	/**
	* @function setMap.toggleBounceMarker
	* @description Add animation 'bounce' to the marker
	* @param {Object} marker - Marker of the map
	* @see Used in:
	* @see - {@link toggleBounceMarker}
	*/
	function toggleBounceMarker(marker) {
		if (marker.getAnimation() !== null) {
			marker.setAnimation(null);
		} else {
			marker.setAnimation(google.maps.Animation.BOUNCE);
		}
	}

	initMap(snazzymaps.mapStyles);
}