'use strict';

let numberOfProfiles = null;
const nextProfileBtn = document.querySelector('#nextProfile');
const URL = 'js/data.json';
const CARD_LIST = document.querySelector('.app-request__container');
const profileNumInput = document.querySelector('.app-request__input');
const initData = {
  currentProfile: 1
}

let data = fetch(URL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    renderCards(data);
    setProfilesNum(data);
    
    setNumberProfiles(numberOfProfiles);
    onActiveProfile(initData.currentProfile);

    nextProfileBtn.addEventListener('click', onNextProfile)
    profileNumInput.addEventListener('change', function(evt) {
      let curretnInputValue = this.value;
      if (curretnInputValue > 0 && curretnInputValue <= numberOfProfiles) {
        initData.currentProfile = curretnInputValue;
        console.log(initData.currentProfile)
        onActiveProfile(this.value);
      }
    })
  })
  .catch(alert);

function onNextProfile() {
  initData.currentProfile++;

  if (initData.currentProfile > numberOfProfiles) initData.currentProfile = 1;
  
  profileNumInput.value = initData.currentProfile;

  onActiveProfile(initData.currentProfile);
}

function setNumberProfiles(numbersOfProfiles) {
  let appRequestAll = document.querySelector('.app-request__all-request');
  appRequestAll.textContent = numbersOfProfiles;
}

function setProfilesNum(num) {
  const profilesCount = num.cards.length;
  numberOfProfiles = profilesCount;
}

function onActiveProfile(profileNum) {
  const allProfiles = Array.from(document.querySelectorAll('.app-request__wrap'));

  allProfiles.forEach((profile, i) => {
    let currentNumProfile = profileNum - 1;
    if(i == currentNumProfile) {
      profile.classList.remove('not-visible');
    } else {
      profile.classList.add('not-visible');
    }
  })
}

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