'use strict';

(function () {
  var SCALE_DEFAULT = window.scale.SCALE_DEFAULT;

  var form = window.setup.form;
  var uploadButton = window.setup.uploadButton;
  var uploadFile = window.setup.uploadFile;
  var editImg = window.setup.editImg;
  var imgPreview = window.setup.imgPreview;

  var biggerControl = window.scale.biggerControl;
  var smallerControl = window.scale.smallerControl;
  var inputScale = window.scale.inputScale;
  var addScaleImg = window.scale.addScaleImg;
  var onControlClick = window.scale.onControlClick;

  var validHashtags = window.text.validHashtags;
  var textHashtags = window.text.textHashtags;


  var cancelButton = editImg.querySelector('.cancel');

  uploadFile.addEventListener('change', function () {
    editImg.classList.remove('hidden');

    addScaleImg(inputScale, SCALE_DEFAULT, imgPreview);

    cancelButton.addEventListener('click', onButtonClick);
    document.addEventListener('keydown', onFormEscPress);
  });

  textHashtags.addEventListener('focus', function () {
    document.removeEventListener('keydown', onFormEscPress);
  });

  textHashtags.addEventListener('blur', function () {
    document.addEventListener('keydown', onFormEscPress);
  });

  smallerControl.addEventListener('click', onControlClick);
  biggerControl.addEventListener('click', onControlClick);

  uploadButton.addEventListener('click', function () {
    validHashtags(textHashtags.value, textHashtags);
  });

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    // console.log('отправились данные');
  });

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
})();
