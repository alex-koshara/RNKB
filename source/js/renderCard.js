window.renderCardTemplate = (function () {
  const CARD_TEMPALTE = document.querySelector('#card-template');
  let cardElement = CARD_TEMPALTE.content.querySelector('.app-request__wrap');

  return function (card) {
    let newCard = cardElement.cloneNode(true);
    let initDataWrap = newCard.querySelector('.initial-data__wraps');
    let calcDataWrap = newCard.querySelector('.calculated-data__wraps');

    card.initFields.forEach((field, i) => {
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