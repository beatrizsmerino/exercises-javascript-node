// Base path
page.base('/');

// Specifying routes
page('/', getPageHome);
page('home', getPageHome);
page('stations', getPageAllStations);
page('stations/:id', getPageStation);
page('*', getPageError404);

// Set up the router to start and actively watch for changes
// page(); or page.start();
page.start();
page('/');


function getPageHome() {
	document.getElementsByClassName("page")[0].setAttribute("id", "pageHome");
	document.getElementById("pageTitle").textContent = "Home";
	getContentHome();
}

function getPageAllStations() {
	document.getElementsByClassName("page")[0].setAttribute("id", "pageStations");
	document.getElementById("pageTitle").textContent = "Stations";
	getContentAllStations();
}

function getPageStation(ctx) {
	document.getElementsByClassName("page")[0].setAttribute("id", "pageStation");
	document.getElementById("pageTitle").textContent = "Station";
	// console.log(ctx);
	getContentStation(ctx);
}

function getPageError404() {
	document.getElementsByClassName("page")[0].setAttribute("id", "pageError404");
	document.getElementById("pageTitle").textContent = "Page not found";
	getContentError404();
}