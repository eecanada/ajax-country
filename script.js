'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

function renderError(msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
}

function renderCountry(data, className = '') {
  const languages = Object.values(data.languages);
  const currencies = Object.values(data.currencies);

  const html = `
  <article class="country ${className}">
  <img class="country__img" src="${data.flags.svg}" />
  <div class="country__data">
    <h3 class="country__name">${data.name.common}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)} million people</p>
    <p class="country__row"><span>🗣️</span>${languages[0]}</p>
    <p class="country__row"><span>💰</span>${currencies[0].name}</p>
  </div>
</article>
  `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
}

function renderNeighbor(data1, className = '') {
  const languages = Object.values(data1[0].languages);
  const currencies = Object.values(data1[0].currencies);

  const html = `
  <article class="country ${className}">
  <img class="country__img" src="${data1[0].flags.svg}" />
  <div class="country__data">
    <h3 class="country__name">${data1[0].name.common}</h3>
    <h4 class="country__region">${data1[0].region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data1[0].population / 1000000
    ).toFixed(1)} million people</p>
    <p class="country__row"><span>🗣️</span>${languages[0]}</p>
    <p class="country__row"><span>💰</span>${currencies[0].name}</p>
  </div>
</article>
  `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
}

function getJSON(url, errorMsg = 'Something went wrong') {
  return fetch(url).then((response) => {
    if (response.okay) throw new Error(`${errorMsg} ${response.status}`);
    return response.json();
  });
}

function getCountryData(country) {
  //country 1
  getJSON(
    `https://restcountries.com/v3.1/name/${country}
  `,
    'Country not found'
  )
    .then((data) => {
      renderCountry(data[0]);
      const neighbor = data[0].borders[0];

      if (!neighbor) throw new Error('No neighbor found');

      //country 2
      return getJSON(`https://restcountries.com/v3.1/alpha/${neighbor}`);
    })
    .then((data1) => renderNeighbor(data1, 'neighbour'))

    .catch((err) => {
      renderError(`Something went wrong 💣 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
}

btn.addEventListener('click', function () {
  getCountryData('usa');
});
