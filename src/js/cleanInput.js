const inputRef = document.querySelector("#search-box");
const countryCardWrapRef = document.querySelector(".country-info");
const countryListRef = document.querySelector(".country-list");

export const cleanInput = () => {
  inputRef.value.trim();
  countryCardWrapRef.innerHTML = "";
  countryListRef.innerHTML = "";
}
