// Ejemplo PROMISE
const getCountPokemon = () => {
	return new Promise((resolve, reject) => {
		const url = `https://pokeapi.co/api/v2/pokemon/`;
		fetch(url)
			.then(response => {
				// console.log(`Estado del Servidor: ${response.status === 200 ? "OK" : "Error"}`);
				// console.log(response);
				resolve(response.json());
			})
			.catch((e) => reject(`Error: ${e}`));
	});
};


const getAllPokemon = (totalNumber) => {
	const url = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${totalNumber}`;
	// console.log(url);

	return new Promise((resolve, reject) => {
		fetch(url)
			.then(response => {
				resolve(response.json());
			})
			.catch((e) => reject(`Error: ${e}`));
        /*
        .then(
            response => {
                console.log(response);
                response.json();
            },
            e => console.log(`Error capturado: ${e}`)
        )
        */
	});
}





function getAllName(array) {
	// console.log(array);
	let pokemonListDom = document.createElement("article");
	pokemonListDom.setAttribute("class", "pokemon-list");
	pokemonListDom.setAttribute("id", "pokemonList");

	for (let index = 0; index < array.length; index++) {
		const object = array[index];
		// console.log(object);

		let pokemonDom = document.createElement("span");
		pokemonDom.setAttribute("class", "pokemon-tag");
		pokemonDom.setAttribute("data-url", object["url"]);

		let pokemonTextDom = document.createTextNode("#" + (index + 1) + " " + object["name"]);

		pokemonDom.appendChild(pokemonTextDom);
		pokemonListDom.appendChild(pokemonDom);

	}

	document.getElementById("pageMain").appendChild(pokemonListDom);

	let pokemonTag = document.getElementsByClassName("pokemon-tag");
	for (let index = 0; index < pokemonTag.length; index++) {
		const element = pokemonTag[index];
		element.addEventListener("click", function () {
			let pokemonUrl = this.getAttribute("data-url");

			getPokemon(pokemonUrl);
		});
	}

}

function getPokemon(pokemonUrl) {
	const url = pokemonUrl;
	console.log(url);
	fetch(url)
		.then(response => console.log(response.json()))
		.catch(e => console.log("Error: " + e));
}


getCountPokemon()
	.then(response => {
		// console.log(response);
		let numberTotalPokemon = response.count;
		console.log("Hay " + numberTotalPokemon + " pokemons");

		let totalPokemonElem = document.createElement("p");
		totalPokemonElem.setAttribute("class", "pokemon-total");
		let totalPokemonTextElem = document.createTextNode("Total: " + numberTotalPokemon + " pokemons");
		totalPokemonElem.appendChild(totalPokemonTextElem);

		document.getElementById("pageSection").prepend(totalPokemonElem);

		getAllPokemon(numberTotalPokemon)
			.then(
				response => {
					// console.log(response);
					// console.log(response.results);
					let jsonTotalPokemon = response.results;
					getAllName(response.results);
				}
			)

	});