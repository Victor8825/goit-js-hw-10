import '../css/styles.css';
import { Notify } from '../../node_modules/notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';
import { buildCountryMarkup } from './buildCountryMarkup';
import { buildCountryListMarkup } from './buildCountryListMarkup';
import { cleanInput } from './cleanInput';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 500;
const inputRef = document.querySelector("#search-box");
const countryCardWrapRef = document.querySelector(".country-info");
const countryListRef = document.querySelector(".country-list");

Notify.init ({
  position: 'left-top',
  fontSize: "20px",
  width: "400px",
})

inputRef.addEventListener("input", debounce( () => {
  if (inputRef.value === "") {
    cleanInput();
    return;
  }
  fetchCountries(inputRef.value)
    .then(country => {
      if (country.length > 10) {
        countryCardWrapRef.innerHTML = "";
        countryListRef.innerHTML = "";
        Notify.info("Too many matches found. Please enter a more specific name.");
      }
      if (country.length >= 2 && country.length <= 10) {
        countryCardWrapRef.innerHTML = "";
        countryListRef.innerHTML = buildCountryListMarkup(country); 
      }
      if (country.length === 1) {
        countryListRef.innerHTML = "";
        countryCardWrapRef.innerHTML = buildCountryMarkup(country[0]); 
      }
      if (inputRef.value === "") {
        cleanInput();
      }      
    })
    .catch(() => {
      Notify.failure("Oops, there is no country with that name");
      countryCardWrapRef.innerHTML = "";
      countryListRef.innerHTML = "";
    }); 
}, DEBOUNCE_DELAY));

