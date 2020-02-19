/**
 * @file Weather with the 'Open Weather API'
 * @module weather
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */



// Need API key
let keyAPI = "XXXXXX";
let urlAPI = "http://api.openweathermap.org/data/2.5/weather?units=metric&lang=es&APPID=" + keyAPI;



export async function getByCoords(coords) {
    // console.log(coords);
    const url = `${urlAPI}&lat=${coords.latitude}&lon=${coords.longitude}`;
    // console.log(url);

    try {
        const response = await fetch(url);
        return `Estado del servidor: ${response.status === 200 ? "OK" : "NOT OK"}`;
    } catch (e) {
        throw `Manejo intero del error. Error original: ${e}`;
    }
}