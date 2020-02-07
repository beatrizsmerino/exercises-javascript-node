/**
 * @file 
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */





import * as googleMaps from './google-maps-config.js';
import * as snazzymaps from './google-maps-config-styles.js';





export function insertTagScript() {
    const scriptElem = document.createElement("script");
    scriptElem.setAttribute("src", `${googleMaps.API}js?key=${googleMaps.API_KEY_MAP}`);
    scriptElem.setAttribute("async", "");
    scriptElem.setAttribute("defer", "");

    document.getElementsByTagName("body")[0].appendChild(scriptElem);
}


export function setMap(coords) {
    const mapDom = document.getElementById("googleMapsMap");
    mapDom.innerHTML = "";

    function initMap(jsonStyles) {
        const position = {
            lat: coords.latitude,
            lng: coords.longitude
        };

        const map = new google.maps.Map(mapDom, {
            center: position,
            zoom: 16,
            styles: jsonStyles
        });

        const infoMarker = `
			<div class="marker">
				<h3 class="marker__title">
					Currrent location:
				</h3>
				<p class="marker__text">
					<strong class="marker__strong">Latitude:</strong> ${position.lat}
					<br>
					<strong class="marker__strong">Longitude:</strong> ${position.lng}
				</p>
			</div>
		`;
        addMarker(infoMarker, position, map);
    }

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

    function addInfoMarker(marker, contentMarker, map) {
        const infowindow = new google.maps.InfoWindow({
            content: contentMarker
        });
        marker.addListener('click', () => {
            infowindow.open(map, marker);
        });
    }

    function toggleBounceMarker(marker) {
        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
        }
    }

    initMap(snazzymaps.mapStyles);
}


export function setImage(coords) {
    const imageDom = document.getElementById("googleMapsImage");
    const image = new Image;

    // Settings values: https://developers.google.com/maps/documentation/streetview/intro
    const settings = {
        key: googleMaps.API_KEY_MAP, // (required) you need an API key
        location: `${coords.latitude},${coords.longitude}`, // (required) coords of latitude and longitude
        size: "350x350", // (required) size image, specified in pixels, of the width and height
        signature: googleMaps.API_KEY_STREETVIEW, // (optional) digital signature used to verify that any site generating requests using your API key is authorized to do so
        heading: null, // (optional) compass heading, specified in degrees,  of the camera | (by default: location) | (values acepted: 0-360) (North: 0 and 360, East: 90, West: 270, South: 180)
        fov: 90, // (optional) horizontal field, specified in degrees, of view of the image | (by default: 90) | (max value acepted: 120)
        pitch: 0, // (optional) vertical field, specified in degrees, of the camera relative to the Street View vehicle. | (by default: 0) | (Up: 90, Down: -90)
        radius: 50, // (optional) radius, specified in meters, in which to search for a panorama, centered on the given location | (by default: 50) | (values acepted: non-negative integers)
        source: "outdoor" // (optional) Limits Street View searches to selected sources | (by default: default) | (values acepted: default or outdoor)
    };

    settings.fov = 120;
    settings.radius = 120;

    // I removed this parametter &signature=${settings.signature} do not work fot me
    const imageRoot = `${googleMaps.API}streetview?key=${settings.key}&location=${settings.location}&size=${settings.size}&heading=${settings.heading}&fov=${settings.fov}&pitch=${settings.pitch}&radius=${settings.radius}&source=${settings.source}`;
    console.log(imageRoot);
    image.src = imageRoot;

    imageDom.innerHTML = "";
    imageDom.appendChild(image);
}