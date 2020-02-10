/**
 * @file Component: Leaflet
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */





/**
 * 
 * @param {*} location 
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

	createMap(map, copyright);
	createMarker(map, coords, infoMarker);
}




/**
 * @function createMap
 * @description
 * @param {Object} map 
 * @param {String} textAttribution 
 */
function createMap(map, textAttribution) {
	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: textAttribution
	}).addTo(map);
}



/**
 * @function createMarker
 * @description
 * @param {*} map 
 * @param {*} coords 
 * @param {*} infoMarker 
 */
function createMarker(map, location, infoMarker) {
	L.marker(location).addTo(map)
		.bindPopup(infoMarker)
		.openPopup();
}