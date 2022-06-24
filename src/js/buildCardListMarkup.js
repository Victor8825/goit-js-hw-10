export const buildCardListMarkup = country => {
  return country.map( countr => 
   `<li class="country-list__element">
   <img src="${countr.flags.svg}" alt="country flag" width="30" height="30"/>${countr.name.official}
   </li>`);
}