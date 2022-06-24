export const buildCountryListMarkup = country => {
  return country.map( countr =>
   `<li class="country-list__element">
   <img src="${countr.flags.svg}" alt="country flag" width="40" height="40"/>${countr.name.official}
   </li>`).join("");
}