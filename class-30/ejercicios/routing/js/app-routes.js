// Base path
page.base('/');

// Specifying routes
page('/', getPageHome);
page('home', getPageHome);
page('stations', getPageAllStations);
page('stations/:id', getPageStation);
page('*', getPageError404);

// Init router
// page(); or page.start();
page.start();
page('/');


function getPageHome(ctx) {
    document.getElementsByClassName("page")[0].setAttribute("id", "pageHome");
    document.getElementById("pageTitle").textContent = "Home";
    getContentHome();
    console.log(ctx);
}

function getPageAllStations(ctx) {
    document.getElementsByClassName("page")[0].setAttribute("id", "pageStations");
    document.getElementById("pageTitle").textContent = "Stations";
    getContentAllStations();
    console.log(ctx);
}

function getPageStation(ctx) {
    document.getElementsByClassName("page")[0].setAttribute("id", "pageStation");
    document.getElementById("pageTitle").textContent = "Station";
    getContentStation();
    console.log(ctx);
}

function getPageError404(ctx) {
    document.getElementsByClassName("page")[0].setAttribute("id", "pageError404");
    document.getElementById("pageTitle").textContent = "Page not found. Error 404";
    console.log(ctx);
}