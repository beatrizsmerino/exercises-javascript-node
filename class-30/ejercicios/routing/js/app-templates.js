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


function getContentStation(ctx) {
	let template = document.getElementById("station").innerHTML;
	let compile = Handlebars.compile(template);

	const stationId = ctx.params.id;
	// console.log(stationId);

	// console.log(urlAPI + optionsAPI.stations + stationId);
	getData(urlAPI + optionsAPI.stations + stationId)
		.then(response => {
			let data = { station: response };
			// console.log(data);

			let compiledHTML = compile(data);
			// console.log(compiledHTML);

			document.getElementById("app").innerHTML = compiledHTML;
		})
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
	console.log(compiledHTML);
	document.getElementById("app").innerHTML = compiledHTML;
}