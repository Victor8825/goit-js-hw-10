import './css/styles.css';
const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;
const searchParams = new URLSearchParams ({
fields: [
  "name", "capital", "population", "flags", "languages"]
});

const inputRef = document.querySelector("#search-box");
const countryCardWrap = document.querySelector(".country-info");

inputRef.addEventListener("input", debounce( () => {
  fetchCountries(inputRef.value)
    .then(country => {
      console.log(buildCardMarkup(country[0]));
      countryCardWrap.innerHTML = buildCardMarkup(country[0]); 
    })  
}, DEBOUNCE_DELAY));

function fetchCountries(name) {
  return fetch(`https://restcountries.com/v3.1/name/${name}?${searchParams}`)
    .then(response => response.json())
}

function buildCardMarkup({flags, name, capital, population, languages}) {
  let languagesArray = [];
  const values = Object.values(languages).join(", ");
  for(const value of values) {
    languagesArray += value;
  }
  return `<h2>
  <img src="${flags.svg}" alt="country flag" width="16" height="16"/>${name.official}</h2>
  <ul class="country-info">
  <li>Capital: ${capital}</li>
  <li>Population: ${population}</li>
  <li>Languages: ${languagesArray}</li>
  </ul>`;
}
  





  // else (inputRef.value === "") {
  //   inputRef.value.trim();
  // }


// function cleanInput () {

// }