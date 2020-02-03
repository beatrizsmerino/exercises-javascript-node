'use strict';


// DEPENDENCIES
// =================================================
const gulp = require('gulp'),
    browserify = require('browser-sync').create(),
    browserifyHandlebars = require('browserify-handlebars'),
    reload = browserify.reload,
    historyApiFallback = require('connect-history-api-fallback');



function watch() {
    browserify.init({
        transform: [browserifyHandlebars],
        files: ['**/*'],
        server: {
            baseDir: ".",
            middleware: [historyApiFallback()]
        },
        port: 3030
    });

    gulp.watch(
        [
            '**/*'
        ]
    ).on('change', reload);
}


exports.watch = watch;


gulp.task('default', gulp.parallel(watch));