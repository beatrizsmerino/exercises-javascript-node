// Base path
page.base('/');

// Specifying routes
page('/', getPageHome);
page('home', getPageHome);
page('stations', getPageStation);
page('*', getPageHome);

// Init router
// page(); or page.start();
page.start();


function getPageHome() {
	document.getElementById("pageTitle").textContent = "Home";
}

function getPageStation() {
	document.getElementById("pageTitle").textContent = "Station";
}

function getPageError404() {
	document.getElementById("pageTitle").textContent = "Page not found. Error 404";
}