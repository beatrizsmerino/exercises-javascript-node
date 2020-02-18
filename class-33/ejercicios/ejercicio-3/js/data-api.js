/**
 * @file Get data API metro of 'Los Angeles'
 * @module apiMetro
 * @author Beatriz Sopeña Merino <beatrizsmerino@gmail.com>
 * @copyright (2020)
 */





export const getData = async (url) => {
	const response = await fetch(url);
	// console.log(`Status: ${response.status === 200 ? "OK" : "NOT OK"}`);
	return response.json();
}