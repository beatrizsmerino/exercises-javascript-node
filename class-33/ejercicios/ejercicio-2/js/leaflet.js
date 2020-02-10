/**
 * @file Component: Leaflet
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */





/**
 * @function leaflet.initMap
 * @description Init a map with 'API Leaflet'
 * @param {Object} location 
 */
export function initMap(location) {
	const coords = [location.latitude, location.longitude];
	const copyright = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

	const map = L.map("map", {
		center: coords,
		zoom: 17
	});

	const infoMarker = `
			<div class="marker">
				<h3 class="marker__title">
					Currrent location:
				</h3>
				<p class="marker__text">
					<strong class="marker__strong">Latitude:</strong> ${location.latitude.toFixed(4)}
					<br>
					<strong class="marker__strong">Longitude:</strong> ${location.longitude.toFixed(4)}
				</p>
			</div>
        `;

	createMap(map, "voyager_nolabels", copyright);
	createMarker(map, coords, infoMarker);
}




/**
 * @function createMap
 * @description Create a map with the 'API Leaflet'
 * Default: https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
 * Customize: https://wiki.openstreetmap.org/wiki/Tiles, https://carto.com/help/building-maps/basemap-list/
 * Styles carto:
 * https://{s}.basemaps.cartocdn.com/{style}/{z}/{x}/{y}{scale}.png
 * {style}: ight_all | dark_all | light_nolabels | light_only_labels | dark_nolabels | dark_only_labels | rastertiles/voyager | rastertiles/voyager_nolabels | rastertiles/voyager_only_labels | rastertiles/voyager_labels_under
 * Examples
 * - https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png
 * - https://cartodb-basemaps-{s}.global.ssl.fastly.net/ight_only_labels/{z}/{x}/{y}.png
 * @param {Object} map 
 * @param {String} textAttribution 
 */
function createMap(map, style, textAttribution) {
	L.tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/${style}/{z}/{x}/{y}${(L.Browser.retina ? '@2x.png' : '.png')}`, {
		attribution: textAttribution
	}).addTo(map);
}



/**
 * @function createMarker
 * @description Create a marker with the 'API Leaflet'
 * @param {Object} map 
 * @param {Object} location 
 * @param {String} infoMarker 
 */
function createMarker(map, location, infoMarker) {
	L.marker(location).addTo(map)
		.bindPopup(infoMarker)
		.openPopup();
}