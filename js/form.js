'use strict';

(function () {
  var SCALE_DEFAULT = window.scale.SCALE_DEFAULT;


  var uploadFile = window.setup.uploadFile;
  var editImg = window.setup.editImg;
  var imgPreview = window.setup.imgPreview;

  var biggerControl = window.scale.biggerControl;
  var smallerControl = window.scale.smallerControl;
  var inputScale = window.scale.inputScale;

  var addScaleImg = window.scale.addScaleImg;
  var onControlClick = window.scale.onControlClick;


  var cancelButton = editImg.querySelector('.cancel');


  var onButtonClick = function () {
    editImg.classList.add('hidden');

    document.removeEventListener('keydown', onFormEscPress);
    cancelButton.removeEventListener('click', onButtonClick);
  };

  var onFormEscPress = function (evt) {
    if (evt.key === 'Escape') {
      editImg.classList.add('hidden');
      uploadFile.value = '';

      // TODO: сделать ресет "формы"

      document.removeEventListener('keydown', onFormEscPress);
      cancelButton.removeEventListener('click', onButtonClick);
    }
  };


  uploadFile.addEventListener('change', function () {
    editImg.classList.remove('hidden');

    addScaleImg(inputScale, SCALE_DEFAULT, imgPreview);

    cancelButton.addEventListener('click', onButtonClick);
    document.addEventListener('keydown', onFormEscPress);
  });

  smallerControl.addEventListener('click', onControlClick);
  biggerControl.addEventListener('click', onControlClick);
})();
