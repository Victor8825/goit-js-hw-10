import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const inputRef = document.querySelector("#search-box");
const countryCardWrapRef = document.querySelector(".country-info");
const countryListRef = document.querySelector(".country-list");
const searchParams = new URLSearchParams ({
  fields: [
    "name", "capital", "population", "flags", "languages"]
  });

inputRef.addEventListener("input", debounce( () => {
  if (inputRef.value === "") {
    cleanInput();
    return;
  }
  fetchCountries(inputRef.value)
    .then(country => {
      if (country.length > 10) {
        Notify.info("Too many matches found. Please enter a more specific name.");
      }
      if (country.length >= 2 && country.length <= 10) {
        countryCardWrapRef.innerHTML = "";
        countryListRef.innerHTML = buildCardListMarkup(country); 
      }
      if (country.length === 1) {
        countryListRef.innerHTML = "";
        countryCardWrapRef.innerHTML = buildCardMarkup(country[0]); 
      }
      if (inputRef.value === "") {
        cleanInput();
      }      
    })
    .catch(() => {
      countryCardWrapRef.innerHTML = "";
      countryListRef.innerHTML = "";
    }); 
}, DEBOUNCE_DELAY));

function fetchCountries(name) {
  return fetch(`https://restcountries.com/v3.1/name/${name}?${searchParams}`)
    .then(response =>{
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    });
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

function buildCardListMarkup (country) {
  return country.map( countr => 
   `<li><img src="${countr.flags.svg}" alt="country flag" width="16" height="16"/>${countr.name.official}</li>`
  );
}
 
function cleanInput () {
    inputRef.value.trim();
    countryCardWrapRef.innerHTML = "";
    countryListRef.innerHTML = "";
}
  