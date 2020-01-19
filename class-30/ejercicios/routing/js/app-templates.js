function getContentHome() {
	let template = document.getElementById("home").innerHTML;
	// console.log(template);

	let compile = Handlebars.compile(template);
	let compiledHTML = compile({
		urlAPI: "https://airemad.docs.apiary.io/",
		urlPagejs: "https://visionmedia.github.io/page.js/",
		urlHandlebars: "https://handlebarsjs.com/"
	});
	// console.log(compiledHTML);

	document.getElementById("app").innerHTML = compiledHTML;
}


function getContentAllStations() {
	let template = document.getElementById("stations").innerHTML;
	let compile = Handlebars.compile(template);

	getData(urlAPI + optionsAPI.stations)
		.then(response => {
			let data = { station: response };
			// console.log(data);

			let compiledHTML = compile(data);
			// console.log(compiledHTML);

			document.getElementById("app").innerHTML = compiledHTML;
		})
}


function getContentStation() {
	let template = document.getElementById("station").innerHTML;
	let compile = Handlebars.compile(template);

	let buttonStation = document.getElementsByClassName("station__button");
	if (buttonStation) {
		for (let index = 0; index < buttonStation.length; index++) {
			const button = buttonStation[index];
			button.addEventListener("click", function () {
				const stationId = this.getAttribute("data-id");
				// console.log(stationId);
				// console.log(urlAPI + optionsAPI.stations + stationId);

				getData(urlAPI + optionsAPI.stations + stationId)
					.then(response => {
						let data = { station: response };
						console.log(data);

						var compiledHTML = compile(data);
						console.log(compiledHTML);

						document.getElementById("app").innerHTML = compiledHTML;
					})
			});
		}
	}
}


getContentHome();