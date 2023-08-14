const imgContainer = document.querySelector("#main-img-container img");
const caption = document.getElementById("poke-img-caption");
const pokeName = document.getElementById("name");
const pokeSpecies = document.getElementById("species");
const pokeWeight = document.getElementById("weight");
const pokeHeight = document.getElementById("height");
const abilitiesList = document.getElementById("abilities-list");
const getPokeBtn = document.getElementById("get-poke-button");
// utility functions

function setNodeText(domNode, text){
    domNode.innerText = text;
}

function setImgAttrs(imgNode, imgSrc, imgAlt){
    imgNode.src = imgSrc;
    imgNode.alt = imgAlt;
}

// project-specific-function

function setPokeBasics(pokemon) {
    setNodeText(pokeName, `NAME: ${pokemon.name}`)
    setNodeText(pokeSpecies, `SPECIES: ${pokemon.species.name}`)
    setNodeText(pokeWeight, `WEIGHT: ${pokemon.weight}`)
    setNodeText(pokeHeight, `HEIGHT: ${pokemon.height}`)
}

function listPokeAbilities(pokemon){
    let htmlString = "";
    pokemon.abilities.forEach(
        (item) => (htmlString += `<li>${item.ability.name}</li>`));
    abilitiesList.innerHTML = htmlString;
}

function createPokeProfile(pokemon){
    const imgSRC = pokemon.sprites.other["official-artwork"].front_default;
    setImgAttrs(imgContainer, imgSRC, pokemon.name);
    setPokeBasics(pokemon);
    listPokeAbilities(pokemon);
}

function getPokemon(){
    const randomPokeID = Math.floor(Math.random()* 1000 + 1);

    fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokeID}`)
    .then((res) => res.json())
    .then((json) => {
        const pokemon = json;
      console.log(pokemon);
        const name = pokemon.name;
        caption.innerText = name; 
        imgContainer.alt = name;
        createPokeProfile(pokemon);
        
    })
    .catch((err) => console.log(err));
}

getPokeBtn.addEventListener("click", function(){
    getPokemon();
});

getPokemon();
