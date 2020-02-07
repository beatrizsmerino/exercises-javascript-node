/**
 * @file 
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */





import * as geolocation from './geolocation.js';
import * as googleMaps from './google-maps.js';



(function () {
    googleMaps.insertTagScript();

    document.getElementById("getGeolocation").addEventListener("click", function (e) {
        event.preventDefault();
        geolocation.setGeolocation();
    });
})();