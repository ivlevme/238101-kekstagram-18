'use strict';

(function () {
  var load = window.backend.load;

  var genPicture = window.picture.genPicture;

  var genPreview = window.preview.genPreview;

  var picturesContainer = document.querySelector('.pictures');


  var loadData = function (data) {
    picturesContainer.appendChild(genPicture(data));
    genPreview(data);
  };

  var onError = function () {
  };

  load(loadData, onError);
})();
