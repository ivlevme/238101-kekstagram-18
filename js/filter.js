import Picture from './picture.js';

const genPicture = Picture.genPicture;

const COUNT_RANDOM_PICTURES = 10;
const COUNT_DEL_ELEMENTS = 1;
const START_INDEX_MASSIVE = 0;

const ValueFilter = {
  POPULAR: `filter-popular`,
  RANDOM: `filter-random`,
  DISCUSSED: `filter-discussed`
};

const formFilter = document.querySelector(`.img-filters__form`);
const buttonsFilter = formFilter.querySelectorAll(`.img-filters__button`);

const picturesContainer = document.querySelector(`.pictures`);

let sourcePictures;
let timer = null;

buttonsFilter.forEach((button) => button.addEventListener(`click`, onButtonClick));


function onButtonClick(evt) {
  let activeButton = formFilter.querySelector(`.img-filters__button--active`);
  activeButton.classList.remove(`img-filters__button--active`);

  let currentButton = evt.target;
  currentButton.classList.add(`img-filters__button--active`);

  debounce(() => updatePictures(evt.target.id, sourcePictures));
}

function updatePictures(selectedFilter, data) {
  if (!sourcePictures) {
    sourcePictures = data.slice();
  }

  switch (selectedFilter) {
    case ValueFilter.POPULAR:
      updatePicturesContainer(sourcePictures);
      break;

    case ValueFilter.RANDOM:
      let allPictures = data.slice();
      let randomPictures = [];

      while (randomPictures.length < COUNT_RANDOM_PICTURES) {
        let randomNumber = getRandomNumber(START_INDEX_MASSIVE, allPictures.length);
        let currentPicture = allPictures.splice(randomNumber, COUNT_DEL_ELEMENTS);
        randomPictures.push(currentPicture[START_INDEX_MASSIVE]);
      }

      updatePicturesContainer(randomPictures);
      break;

    case ValueFilter.DISCUSSED:
      let filteredPictures = data.slice();
      filteredPictures.sort((a, b) => b.comments.length - a.comments.length);

      updatePicturesContainer(filteredPictures);
      break;
  }
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function updatePicturesContainer(picturesData) {
  delCurrentPictures();

  let pictures = genPicture(picturesData);
  picturesContainer.appendChild(pictures);
}

function delCurrentPictures() {
  let currentPictures = picturesContainer.querySelectorAll(`.picture`);

  currentPictures.forEach((picture) => picture.remove());
}

function debounce(cb) {
  let DEBOUNCE_INTERVAL = 500;

  if (timer) {
    clearTimeout(timer);
  }

  timer = setTimeout(cb, DEBOUNCE_INTERVAL);
}


const Filter = {
  updatePictures
};

export default Filter;
