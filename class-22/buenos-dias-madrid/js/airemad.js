/**
 * @file
 * @module airemad
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */





// API airemad
const aireMadAPI = "http://airemad.com/api/v1/";





const getData = async (url) => {
	const data = await fetch(url);
	const json = await data.json();
	return json;
};





export function setStations() {
	const dataStations = getData(aireMadAPI + "station")
		.then(data => data)
		.then(data => {
			console.info("Stations: ", data);

			const block = document.createElement("section");
			block.setAttribute("id", "stations");

			const titleDOM = document.createElement("h2");
			const titleDOMText = document.createTextNode("Estaciones de Madrid");
			titleDOM.appendChild(titleDOMText);
			block.appendChild(titleDOM);

			const contentDOM = document.createElement("article");
			contentDOM.classList.add("content");
			const ulDOM = document.createElement("ul");
			data.map(item => {
				const id = item.id;
				const name = item.nombre_estacion;
				const address = item.direccion;

				let liDOM = document.createElement("li");
				liDOM.setAttribute("id", id);

				let pDOM = document.createElement("p");

				let strongDOM = document.createElement("strong");
				let strongDOMText = document.createTextNode(name);
				strongDOM.appendChild(strongDOMText);

				let addressDOM = document.createElement("address");
				let addressDOMText = document.createTextNode(address);
				addressDOM.appendChild(addressDOMText);

				pDOM.appendChild(strongDOM);
				pDOM.appendChild(addressDOM);

				liDOM.appendChild(pDOM);
				ulDOM.appendChild(liDOM);
			});
			contentDOM.appendChild(ulDOM);
			block.appendChild(contentDOM);

			document.getElementById("pageContent").appendChild(block);
		});
}





export function setPollution(idStation) {
	const url = `${aireMadAPI}pollution/${idStation}`;
	console.log(url);

	const dataPollution = getData(url)
		.then(data => data)
		.then(data => {
			console.info("Pollution: ", data);

			const block = document.createElement("section");
			block.setAttribute("id", "pollution");

			const titleDOM = document.createElement("h2");
			const titleDOMText = document.createTextNode("Estado de la contaminación en Madrid");
			titleDOM.appendChild(titleDOMText);
			block.appendChild(titleDOM);

			document.getElementById("pageContent").appendChild(block);
		});
}





export function setWeather(idStation) {
	const url = `${aireMadAPI}weather/${idStation}`;
	console.log(url);

	const dataWeather = getData(url)
		.then(data => data)
		.then(data => {
			console.info("Weather: ", data);

			const block = document.createElement("section");
			block.setAttribute("id", "weather");

			const titleDOM = document.createElement("h2");
			const titleDOMText = document.createTextNode("Estado del tiempo ahora mismo en Madrid");
			titleDOM.appendChild(titleDOMText);
			block.appendChild(titleDOM);

			document.getElementById("pageContent").appendChild(block);
		});
}





export function setForecastWeather(idStation) {
	const url = `${aireMadAPI}weather/${idStation}`;
	console.log(url);

	const dataWeather = getData(url)
		.then(data => data)
		.then(data => {
			console.info("Forecast weather: ", data);

			const block = document.createElement("section");
			block.setAttribute("id", "forecastWeather");

			const titleDOM = document.createElement("h2");
			const titleDOMText = document.createTextNode("Previsión meteorológica de los próximos 4/5 días en Madrid");
			titleDOM.appendChild(titleDOMText);
			block.appendChild(titleDOM);

			document.getElementById("pageContent").appendChild(block);
		});
}






export function setImageCamera() {

	const dataImageCamera = getData("./cameras-madrid.json")
		.then(data => data)
		.then(data => {
			console.info("Image Camera: ", data);

			const block = document.createElement("section");
			block.setAttribute("id", "imageCamera");

			const titleDOM = document.createElement("h2");
			const titleDOMText = document.createTextNode("Una imagen aleatoria del trafico de la ciudad usando las cámaras abiertas de la ciudad.");
			titleDOM.appendChild(titleDOMText);
			block.appendChild(titleDOM);

			document.getElementById("pageContent").appendChild(block);
		});
}





export const set = () => {
	setStations();
	setPollution("S039");
	setWeather("S039");
	setForecastWeather("S039");
	setImageCamera();
}

