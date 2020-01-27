'use strict';

(function () {
  var COUNT_RANDOM_PICTURES = 10;
  var COUNT_DEL_ELEMENTS = 1;
  var START_INDEX_MASSIVE = 0;
  var Filter = {
    POPULAR: 'filter-popular',
    RANDOM: 'filter-random',
    DISCUSSED: 'filter-discussed'
  };

  var formFilter = document.querySelector('.img-filters__form');
  var buttonsFilter = formFilter.querySelectorAll('.img-filters__button');

  var picturesContainer = document.querySelector('.pictures');

  var genPicture = window.picture.genPicture;

  var sourcePictures;
  var timer = null;

  var onButtonClick = function (evt) {
    var activeButton = formFilter.querySelector('.img-filters__button--active');
    activeButton.classList.remove('img-filters__button--active');

    var currentButton = evt.target;
    currentButton.classList.add('img-filters__button--active');

    debounce(function () {
      updatePictures(evt.target.id, sourcePictures);
    });
  };

  buttonsFilter.forEach(function (button) {
    button.addEventListener('click', onButtonClick);
  });

  var updatePictures = function (selectedFilter, data) {
    if (!sourcePictures) {
      sourcePictures = data.slice();
    }

    switch (selectedFilter) {
      case Filter.POPULAR:
        updatePicturesContainer(sourcePictures);
        break;

      case Filter.RANDOM:
        var allPictures = data.slice();
        var randomPictures = [];

        while (randomPictures.length < COUNT_RANDOM_PICTURES) {
          var randomNumber = getRandomNumber(0, allPictures.length);
          var currentPicture = allPictures.splice(randomNumber, COUNT_DEL_ELEMENTS);
          randomPictures.push(currentPicture[START_INDEX_MASSIVE]);
        }

        updatePicturesContainer(randomPictures);
        break;

      case Filter.DISCUSSED:
        var filteredPictures = data.slice();

        filteredPictures.sort(function (a, b) {
          return b.comments.length - a.comments.length;
        });

        updatePicturesContainer(filteredPictures);
        break;
    }
  };


  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  var updatePicturesContainer = function (picturesData) {
    delCurrentPictures();

    var pictures = genPicture(picturesData);
    picturesContainer.appendChild(pictures);
  };

  var delCurrentPictures = function () {
    var currentPictures = picturesContainer.querySelectorAll('.picture');
    currentPictures.forEach(function (picture) {
      picture.remove();
    });
  };

  var debounce = function (cb) {
    var DEBOUNCE_INTERVAL = 500;

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(cb, DEBOUNCE_INTERVAL);
  };


  window.filter = {
    updatePictures: updatePictures
  };
})();
