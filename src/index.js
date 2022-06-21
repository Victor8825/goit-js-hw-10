import './css/styles.css';
var debounce = require('lodash.debounce');
// import {debounce} from "../node_modules/lodash.debounce/index.js";

const DEBOUNCE_DELAY = 300;
const searchParams = new URLSearchParams ({
fields: [
  "name", "capital", "population", "flags", "languages"]
});

const inputRef = document.querySelector("#search-box");

inputRef.addEventListener("input", debounce( () => {
  fetchCountries(inputRef.value)
  .then(country => {
    console.log(country);
  buildCountryCardMarkup(country)
})  
}, DEBOUNCE_DELAY));

function fetchCountries(name) {
  return fetch(`https://restcountries.com/v3.1/name/${name}?${searchParams}`)
  .then(response => response.json())
}

function buildCountryCardMarkup(country) {

}