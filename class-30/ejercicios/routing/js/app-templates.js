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

	removeContent();
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

			removeContent();
			document.getElementById("app").innerHTML = compiledHTML;
		})
}


function getContentStation(ctx) {
	let template = document.getElementById("station").innerHTML;
	let compile = Handlebars.compile(template);

	const stationId = ctx.params.id;
	// console.log(stationId);

	// console.log(urlAPI + optionsAPI.stations + stationId);
	// getData(urlAPI + optionsAPI.stations + stationId)
	// 	.then(response => {
	// 		let data = { station: response };
	// 		// console.log(data);

	// 		let compiledHTML = compile(data);
	// 		// console.log(compiledHTML);

	// 		removeContent();
	// 		document.getElementById("app").innerHTML = compiledHTML;
	// 	})


	// const urls = [
	// 	urlAPI + optionsAPI.stations + stationId,
	// 	urlAPI + optionsAPI.pollution + stationId,
	// 	urlAPI + optionsAPI.weahter + stationId,
	// 	urlAPI + optionsAPI.pollen + stationId,
	// 	urlAPI + optionsAPI.acustic + stationId
	// ];

	// console.log(urls[0]);
	// console.log(urls[1]);
	// console.log(urls[2]);
	// console.log(urls[3]);
	// console.log(urls[4]);


	Promise.all(
		[
			getData(urlAPI + optionsAPI.stations + stationId),
			getData(urlAPI + optionsAPI.pollution + stationId),
			getData(urlAPI + optionsAPI.weather + stationId),
			getData(urlAPI + optionsAPI.pollen + stationId),
			getData(urlAPI + optionsAPI.acustic + stationId)
		]
	)
		.then((responses) => {
			// console.log(responses);

			let dataResponses = {
				station: responses[0],
				pollution: responses[1],
				weather: responses[2],
				pollen: responses[3],
				acustic: responses[4]
			}
			// console.log(data);


			Object.keys(dataResponses).map((key) => {
				if (dataResponses[key] === 404 || dataResponses[key] === 500) {
					dataResponses[key] = false;
				}
			});
			console.log(dataResponses);


			let compiledHTML = compile(dataResponses);
			// console.log(compiledHTML);

			removeContent();
			document.getElementById("app").innerHTML = compiledHTML;
		});

}


function getContentError404() {
	let template = document.getElementById("error404").innerHTML;
	let compile = Handlebars.compile(template);

	let images = [
		"barcelona.png",
		"madrid.png",
		"granada.png"
	];
	let randomImage = images[Math.floor(Math.random() * images.length)];
	// console.log(randomImage);

	let compiledHTML = compile({ image: randomImage });
	// console.log(compiledHTML);

	removeContent();
	document.getElementById("app").innerHTML = compiledHTML;
}