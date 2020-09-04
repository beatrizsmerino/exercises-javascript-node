/**
 * @file script.js
 * @description Main file
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */





/**
 * @requires gradient
 * @requires moviesAPI
 * @requires moviesCRUD
 */
import * as gradient from './modules/gradient.js';
import * as moviesAPI from './modules/movies-api.js';
import * as moviesCRUD from './modules/movies-crud.js';





/**
 * @function anominFunctionAutoEjecuted
 * @description Functions for init the App
 * @see Used inside: 
 * {@link gradient.add}
 * {@link moviesAPI.setEventsSearchMovies}
 * {@link moviesCRUD.conectDataBaseMovies}, {@link moviesCRUD.getSetListFavorites}, {@link moviesCRUD.showHideListFavorites}
 */
(function () {
	gradient.add("body", gradient.colorGradients, "images/bg.jpg");
	moviesAPI.setEventsSearchMovies();
	moviesCRUD.conectDataBaseMovies();
	moviesCRUD.getSetListFavorites();
	moviesCRUD.showHideListFavorites();
})();