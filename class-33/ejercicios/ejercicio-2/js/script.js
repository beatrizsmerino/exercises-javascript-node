/**
 * @file Main file.
 * Exercise 2. Use 'Leaflet API' for geolocate the user.
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */





/**
* @external geolocation
* @see {@link ./js/geolocation.js}
*/
import * as geolocation from './geolocation.js';





(function () {
    document.getElementById("getGeolocation").addEventListener("click", geolocation.set);
})();