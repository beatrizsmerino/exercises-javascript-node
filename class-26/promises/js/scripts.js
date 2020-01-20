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
    });
}


const getPokemon = (pokemonUrl) => {
    return new Promise((resolve, reject) => {
        const url = pokemonUrl;
        console.log("getPokemon(pokemonUrl)", url);

        fetch(url)
            .then(response => {
                resolve(response.json());
            })
            .catch((e) => reject(`Error: ${e}`));
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

    document.getElementById("pageSection").appendChild(pokemonListDom);

    let pokemonTag = document.getElementsByClassName("pokemon-tag");
    for (let index = 0; index < pokemonTag.length; index++) {
        const element = pokemonTag[index];
        element.addEventListener("click", function () {
            let pokemonUrl = this.getAttribute("data-url");
            console.log(pokemonUrl);

            getPokemon(pokemonUrl)
                .then(result => {
                    console.log("result", result);
                    const pokemonData = {
                        name: result.name,
                        weight: result.weight,
                        height: result.height,
                        image_front: result.sprites.front_default,
                        image_back: result.sprites.back_default
                    };
                    console.log(pokemonData.name);

                    let pokemonElem = document.createElement("div");
                    pokemonElem.setAttribute("id", "pokemonContent");
                    pokemonElem.setAttribute("class", "pokemon-info");
                    document.getElementById("pageSection").innerHTML = "";
                    document.getElementById("pageSection").appendChild(pokemonElem);

                    let pokemonContent = document.getElementById("pokemonContent");
                    if (pokemonData && pokemonContent) {
                        for (const key in pokemonData) {
                            const element = pokemonData[key];

                            if (key === "image_front" || key === "image_back") {
                                let imgContentElem = document.createElement("div");
                                imgContentElem.setAttribute("class", "pokemon-info__image");

                                let imgElem = document.createElement("img");
                                imgElem.setAttribute("src", element);

                                switch (key) {
                                    case "image_front":
                                        imgElem.setAttribute("alt", "Pokemon image front");
                                        break;
                                    case "image_back":
                                        imgElem.setAttribute("alt", "Pokemon image back");
                                        break;
                                    default:
                                        break;
                                }
                                imgContentElem.appendChild(imgElem);
                                pokemonContent.appendChild(imgContentElem);
                            } else {
                                let paragraphElem = document.createElement("p");

                                let strongElem = document.createElement("strong");
                                let strongTextElem = document.createTextNode(key + ":");

                                let spanElem = document.createElement("span");
                                let spanTextElem = document.createTextNode(element);

                                strongElem.appendChild(strongTextElem);
                                spanElem.appendChild(spanTextElem);
                                paragraphElem.appendChild(strongElem);
                                paragraphElem.appendChild(spanElem);
                                pokemonContent.appendChild(paragraphElem);
                            }


                        }
                    }


                });
        });
    }

}



getCountPokemon()
    .then(response => {
        // console.log(response);
        let numberTotalPokemon = response.count;
        // console.log("Hay " + numberTotalPokemon + " pokemons");

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