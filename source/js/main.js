'use strict';

const URL = 'js/data.json';
const CARD_LIST = document.querySelector('.app-request__container');
let numberOfProfiles = null;

let data = fetch(URL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    renderCards(data);
    numberOfProfiles = data.cards.length;
    setNumberProfiles(numberOfProfiles);
  })
  .catch(alert);

function setNumberProfiles(numbersOfProfiles) {
  let appRequestAll = document.querySelector('.app-request__all-request');
  appRequestAll.textContent = numbersOfProfiles;
}

window.renderCardTemplate = (function () {
  const CARD_TEMPALTE = document.querySelector('#card-template');
  let cardElement = CARD_TEMPALTE.content.querySelector('.app-request__container');

  return function (card) {
    let newCard = cardElement.cloneNode(true);
    let initDataWrap = newCard.querySelector('.initial-data__wraps');
    let calcDataWrap = newCard.querySelector('.calculated-data__wraps');
    
    card.initFields.forEach( (field, i) => {
      initDataWrap.innerHTML += `<div class="initial-data__wrap">
          <h3 class="initial-data__field">${field}</h3>
          <p class="initial-data__value">${card.initValues[i]}</p>
        </div>`;
    })

    card.calcFields.forEach((field, i) => {
      calcDataWrap.innerHTML += `<div class="initial-data__wrap">
          <h3 class="initial-data__field">${field}</h3>
          <p class="initial-data__value">${card.calcValues[i]}</p>
        </div>`;
    })

    return newCard;
  };
})();

function renderCards(data) {
  CARD_LIST.innerHTML = '';
  let cards = data;

  if (!Array.isArray(data)) {
    cards = data.cards;
  }

  cards.forEach(function (card) {
    CARD_LIST.appendChild(window.renderCardTemplate(card, data));
  });
}