'use strict';

(function () {
  var SCALE_DEFAULT = window.scale.SCALE_DEFAULT;
  var EFFECT_LEVEL_DEFAULT = window.effect.EFFECT_LEVEL_DEFAULT;

  var save = window.backend.save;

  var main = window.setup.main;
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

  var slider = window.effect.slider;
  var levelValue = window.effect.levelValue;

  var validHashtags = window.text.validHashtags;
  var textHashtags = window.text.textHashtags;
  var textDescription = window.text.textDescription;

  var successTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');

  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');

  var successContainer;
  var successInner;
  var successButton;

  var errorContainer;
  var errorInner;
  var errorButtons;


  var cancelButton = editImg.querySelector('.cancel');

  uploadFile.addEventListener('change', function () {
    editImg.classList.remove('hidden');

    addScaleImg(inputScale, SCALE_DEFAULT, imgPreview);

    levelValue.value = EFFECT_LEVEL_DEFAULT;


    cancelButton.addEventListener('click', onButtonClick);
    document.addEventListener('keydown', onFormEscPress);
  });

  textHashtags.addEventListener('focus', function () {
    document.removeEventListener('keydown', onFormEscPress);
  });

  textHashtags.addEventListener('blur', function () {
    document.addEventListener('keydown', onFormEscPress);
  });

  textDescription.addEventListener('focus', function () {
    document.removeEventListener('keydown', onFormEscPress);
  });

  textDescription.addEventListener('blur', function () {
    document.addEventListener('keydown', onFormEscPress);
  });

  smallerControl.addEventListener('click', onControlClick);
  biggerControl.addEventListener('click', onControlClick);

  uploadButton.addEventListener('click', function () {
    validHashtags(textHashtags.value, textHashtags);
  });

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();

    var formData = new FormData(form);

    save(onSuccess, onSaveMistake, formData);
  });

  var onSuccess = function () {
    closePopup();

    successContainer = successTemplate.cloneNode(true);
    successInner = successContainer.querySelector('.success__inner');
    successButton = successContainer.querySelector('.success__button');

    successInner.addEventListener('mouseover', onMouseover);
    successInner.addEventListener('mouseout', onMouseout);

    successButton.addEventListener('click', onAreaClick);

    main.appendChild(successContainer);

    document.addEventListener('click', onAreaClick);
    document.addEventListener('keydown', onAreaEscPress);
  };

  var onSaveMistake = function () {
    closePopup();

    errorContainer = errorTemplate.cloneNode(true);
    errorInner = errorContainer.querySelector('.error__inner');
    errorButtons = errorContainer.querySelectorAll('.error__button');

    errorButtons.forEach(function (button) {
      button.addEventListener('click', onAreaClick);
    });

    errorInner.addEventListener('mouseover', onMouseover);
    errorInner.addEventListener('mouseout', onMouseout);

    main.appendChild(errorContainer);


    document.addEventListener('click', onAreaClick);
    document.addEventListener('keydown', onAreaEscPress);
  };

  var onMouseover = function () {
    document.removeEventListener('click', onAreaClick);
    document.removeEventListener('keydown', onAreaEscPress);
  };

  var onMouseout = function () {
    document.addEventListener('click', onAreaClick);
    document.addEventListener('keydown', onAreaEscPress);
  };

  var onAreaClick = function () {
    if (successContainer) {
      successContainer.remove();

      successInner.removeEventListener('mouseover', onMouseover);
      successInner.removeEventListener('mouseout', onMouseout);

      successButton.removeEventListener('click', onAreaClick);
    }

    if (errorContainer) {
      errorContainer.remove();

      errorInner.removeEventListener('mouseover', onMouseover);
      errorInner.removeEventListener('mouseout', onMouseout);

      errorButtons.forEach(function (button) {
        button.removeEventListener('click', onAreaClick);
      });
    }


    document.removeEventListener('click', onAreaClick);
    document.removeEventListener('keydown', onAreaEscPress);
  };

  var onAreaEscPress = function (evt) {
    if (evt.key === 'Escape') {
      onAreaClick();
    }
  };

  var onButtonClick = function () {
    closePopup();
  };

  var onFormEscPress = function (evt) {
    if (evt.key === 'Escape') {
      closePopup();
    }
  };

  var closePopup = function () {
    editImg.classList.add('hidden');
    form.reset();
    uploadFile.value = '';


    imgPreview.className = '';
    imgPreview.style.filter = '';
    imgPreview.style.transform = '';

    slider.classList.add('hidden');
    levelValue.value = EFFECT_LEVEL_DEFAULT;

    document.removeEventListener('keydown', onFormEscPress);
    cancelButton.removeEventListener('click', onButtonClick);
  };
})();
