export const buildCardMarkup = ({flags, name, capital, population, languages}) => {
  let languagesArray = [];
  const values = Object.values(languages).join(", ");
  for(const value of values) {
    languagesArray += value;
  }
  return `<h2>
  <img src="${flags.svg}" alt="country flag" width="30" height="30"/>${name.official}</h2>
  <ul class="country-wrap">
  <li>Capital: ${capital}</li>
  <li>Population: ${population}</li>
  <li>Languages: ${languagesArray}</li>
  </ul>`;
}