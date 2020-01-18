const urlAPI = "http://airemad.com/api/v1/";


// const optionsAPI = {
//     "station": "station/",
//     "pollution": "pollution/",
//     "weahter": "weahter/",
//     "pollen": "pollen/",
//     "acustic": "acustic/"
// }

// console.log(optionsAPI.station);





function showActiveLink(ctx, next) {
    deactiveate();
    a(ctx.path).parentNode.classList.add('active');
    next();
}

function showHistory(ctx) {
    // !ctx.init tells render() not to
    // add the .hide class so that the
    // transition animation is ignored
    // for the initial page
    render(template('history'), !ctx.init);
}

function showHome(ctx) {
    render(template('home'), !ctx.init);
}

function showStation(ctx) {
    render(template('station'), !ctx.init);
}

function notfound(ctx) {
    render(template('not-found'), !ctx.init);
}

function render(html, hide) {
    var el = document.getElementById('app');
    if (hide) {
        el.classList.add('hide');
        setTimeout(function () {
            el.innerHTML = html;
            el.classList.remove('hide');
        }, 300);
    } else {
        el.innerHTML = html;
    }
}

function deactiveate() {
    var el = document.querySelector('.active')
    if (el) el.classList.remove('active');
}

function a(href) {
    return document.querySelector('[href=".' + href + '"]');
}

function template(name) {
    return document
        .getElementById(name + '-template')
        .innerHTML;
}