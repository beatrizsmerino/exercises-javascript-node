
var avatars = {
    glottis: 'https://image.flaticon.com/icons/png/512/219/219961.png',
    manny: 'https://un-app.herokuapp.com/assets/teacher-f4f3dd7acfd64b16aa51027159a6f5e8.png',
    sal: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkovcVYkJI4zr3FkFjbROa8S7gkZ42FWLEaDxfIHPKBj8Xg_kg&s'
};

page.base('/state');
page('/', index);
page('/user/:name', load, show);
page('*', notfound);
page();

// everything below is not part of page.js
// just callbacks etc..

function text(str) {
    document.querySelector('p').textContent = str;
}

function index() {
    text('Click a user below to load their avatar');
    document.querySelector('img')
        .style.display = 'none';
}

function load(ctx, next) {
    // check if we have .state.avatar already available
    // this could for example be a cached html fragment.
    if (ctx.state.avatar) {
        ctx.avatar = ctx.state.avatar;
        next();
        return;
    }

    // pretend we're querying some database etc
    setTimeout(function () {
        // you can assign properties to the context
        // for use between these functions. The .state
        // property is what's saved in history.
        ctx.state.avatar = ctx.avatar = avatars[ctx.params.name];
        ctx.save();
        next();
    }, 600);
}

function show(ctx) {
    var img = document.querySelector('img');
    img.src = ctx.avatar;
    img.style.display = 'block';
    text('Showing ' + ctx.params.name);
}

function notfound() {
    document.querySelector('p')
        .textContent = 'not found';
}