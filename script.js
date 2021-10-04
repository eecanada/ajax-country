'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     const languages = Object.values(data.languages);
//     console.log(languages);
//     const currencies = Object.values(data.currencies);
//     console.log(currencies);

//     const html = `
//     <article class="country">
//     <img class="country__img" src="${data.flags.svg}" />
//     <div class="country__data">
//       <h3 class="country__name">${data.name.common}</h3>
//       <h4 class="country__region">${data.region}</h4>
//       <p class="country__row"><span>👫</span>${(
//         +data.population / 1000000
//       ).toFixed(1)} million people</p>
//       <p class="country__row"><span>🗣️</span>${languages[0]}</p>
//       <p class="country__row"><span>💰</span>${currencies[0].name}</p>
//     </div>
//   </article>
//     `;

//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };

function renderCountry(data, className = '') {
  console.log(data);
  const languages = Object.keys(data[0].languages);
  console.log(languages);
  const currencies = Object.values(data[0].currencies);
  console.log(currencies);

  const html = `
  <article class="country ${className}">
  <img class="country__img" src="${data[0].flags.svg}" />
  <div class="country__data">
    <h3 class="country__name">${data[0].name.common}</h3>
    <h4 class="country__region">${data[0].region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data[0].population / 1000000
    ).toFixed(1)} million people</p>
    <p class="country__row"><span>🗣️</span>${languages}</p>
    <p class="country__row"><span>💰</span>${currencies[0].name}</p>
  </div>
</article>
  `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
}

const getCountryAndNeighbor = function (country) {
  //ajax country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const data = JSON.parse(this.responseText);
    console.log(data)
    //render country
    renderCountry(data);

    //get neighbor country 2
    const [neighbor] = data[0].borders;
    if (!neighbor) return;

      //ajax country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbor}`);
    request2.send();
    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      console.log(data2)
      renderCountry(data2, 'neighbour');
    });
  });
};

getCountryAndNeighbor('usa');
