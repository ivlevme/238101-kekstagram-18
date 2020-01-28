'use strict';

(function () {
  var load = window.backend.load;

  var updatePictures = window.filter.updatePictures;

  var filtersContainer = document.querySelector('.img-filters');

  var selectedFilter = document.querySelector('.img-filters__button--active');


  var loadData = function (data) {
    updatePictures(selectedFilter.id, data);

    filtersContainer.classList.remove('img-filters--inactive');
  };

  var onError = function (message) {
    throw new Error(message);
  };

  load(loadData, onError);
})();
