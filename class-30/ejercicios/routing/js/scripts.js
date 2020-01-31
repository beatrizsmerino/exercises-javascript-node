const urlAPI = "http://airemad.com/api/v1/";


const optionsAPI = {
	"stations": "station/",
	"pollution": "pollution/",
	"weahter": "weahter/",
	"pollen": "pollen/",
	"acustic": "acustic/"
};

// console.log(optionsAPI.station);


const getData = (url) => {
	return new Promise((resolve, reject) => {
		fetch(url)
			.then(response => {
				// console.log(`Estado del Servidor: ${response.status === 200 ? "OK" : "NOT OK"}`);
				resolve(response.json())
			})
			.catch(() => reject(`Error al localizar URL`));
	});
};};

function removeContent() {
	document.getElementById("app").innerHTML = "";
}
