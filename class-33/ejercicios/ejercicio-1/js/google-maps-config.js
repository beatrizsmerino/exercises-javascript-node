/**
 * @file Component: googleMaps
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */





/**
 * @const external:googleMaps.API
 * @description API root of 'Google Maps'
 * @type {String}
 * @see Used in:
 * @see - 'google-maps.js' -> {@link external:googleMaps.insertTagScript}, {@link external:googleMaps.setImage}
 */
export const API = "https://maps.googleapis.com/maps/api/";



/**
 * @const external:googleMaps.API_KEY_MAP
 * @description API key of 'Google Maps'
 * Instrucctions of use:
 * 1. Go to https://console.cloud.google.com/apis/credentials/ and generate api key
 * 2. Change the string "XXXXXXXXXXX" for your API KEY
 * @type {String}
 * @see Used in:
 * @see - 'google-maps.js' -> {@link external:googleMaps.insertTagScript}, {@link external:googleMaps.setImage}
 */
export const API_KEY_MAP = "XXXXXXXXXXX";



/**
 * @const external:googleMaps.API_KEY_STREETVIEW
 * @description Street View Static API key of 'Google Maps'
 * Instrucctions of use:
 * 1. Go to './google-maps.js', inside the function imageRoot() copy the url with the real data (without literal templates) without signature parameter
 * 2. Go to https://console.cloud.google.com/google/maps-apis/apis/street-view-image-backend.googleapis.com/staticmap and generate signature of the url copied
 * 3. Change the string "XXXXXXXXXXX" for your API KEY
 * @type {String}
 * @see Used in:
 * @see - 'google-maps.js' -> {@link external:googleMaps.setImage}
 */
export const API_KEY_STREETVIEW = "XXXXXXXXXXX";