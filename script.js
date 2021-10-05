'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

function renderCountry(data, className = '') {
  console.log(data, 'data');
  const languages = Object.values(data.languages);
  console.log(languages);
  const currencies = Object.values(data.currencies);
  console.log(currencies);

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
  countriesContainer.style.opacity = 1;
}

function renderNeighbor(data1, className = '') {
  console.log(data1[0], 'dataaaaaa');
  const languages = Object.values(data1[0].languages);
  console.log(languages);
  const currencies = Object.values(data1[0].currencies);
  console.log(currencies);

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
  countriesContainer.style.opacity = 1;
}

function getCountryData(country) {
  //country 1
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((response) => response.json())
    .then((data) => {
      renderCountry(data[0]);
      const neighbor = data[0].borders[0];

      if (!neighbor) return;

      //country 2
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbor}`);
    })
    .then((response) =>
      response.json().then((data1) => renderNeighbor(data1, 'neighbour'))
    );
}

getCountryData('usa');
// getCountryAndNeighbor('usa');
