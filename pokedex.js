const pokeCard = document.querySelector('[data-pokeCard]');
const pokeName = document.querySelector('[data-pokeName]');
const pokeImg = document.querySelector('[data-pokeImg]');
const pokeContainer = document.querySelector('[data-pokeContainer]');
const pokeId = document.querySelector('[data-pokeId]');
const pokeTypes = document.querySelector('[data-pokeType]');
const pokeStats = document.querySelector('[data-pokeStats]');

const typeColors = {
    electric: '#ffffbf',
    normal: '#d4b2c0',
    fire: '#f6957d',
    water: '#b4e5f6',
    ice: '#dffbf3',
    rock: '#b3b3b3',
    flying: '#d6f8ec',
    grass: '#98cdbc',
    psychic: '#ffd4e7',
    ghost: '#ab888a',
    bug: '#c4fcc2',
    poison: '#a1a6c4',
    ground: '#deb39e',
    dragon: '#da627d',
    steel: '#535a61',
    fighting: '#b7a288',
    fairy: '#ffaaaa',
    dark: '#2b2b2b',
    default: '#ece7f2',
};

const searchPokemon = event => {
    event.preventDefault();
    const { value } = event.target.pokeName;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => renderPokemonData(response))
        .catch(err => renderNotFound())
}
    
const renderPokemonData = data => {
    const sprite =  data.sprites.front_default;
    const { stats, types, moves } = data;
    console.log(data)
    pokeName.textContent = data.name;
    pokeImg.setAttribute('src', sprite);
    pokeId.textContent = `# ${data.id}`;
    setCardColor(types);
    renderPokemonTypes(types);
    renderPokemonStats(stats); 
}
const setCardColor = types => {
    const colorOne = typeColors[types[0].type.name];
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
    pokeImg.style.background =  `linear-gradient(${colorOne}, ${colorTwo})`; 
}
 
const renderPokemonTypes = types => {
    pokeTypes.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
}
const renderPokemonStats = stats => {
    pokeStats.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    });
}

const renderNotFound = () => {
    pokeName.textContent = 'Missingno';
    pokeImg.setAttribute('src', './img/missingno.jpg');
    pokeImg.style.background =  '#fff';
    pokeTypes.innerHTML = '';
    pokeStats.innerHTML = '';
    pokeId.textContent = '';
}