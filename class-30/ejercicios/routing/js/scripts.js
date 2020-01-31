const urlAPI = "http://airemad.com/api/v1/";


const optionsAPI = {
	"stations": "station/",
	"pollution": "pollution/",
	"weather": "weather/",
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
};

function removeContent() {
	document.getElementById("app").innerHTML = "";
}

// Disable refresh page with javascript
function disableF5(e) {
	if ((e.which || e.keyCode == 116)) {
		e.preventDefault();
		//page('/', getPageHome);
	}
};

document.addEventListener("keydown", disableF5);