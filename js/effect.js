'use strict';

(function () {
  var EFFECT_LEVEL_DEFAULT = 100;

  var Effect = {
    CHROME: 'chrome',
    SEPIA: 'sepia',
    MARVIN: 'marvin',
    PHOBOS: 'phobos',
    HEAT: 'heat'
  };

  var CssEffect = {
    chrome: 'grayscale',
    sepia: 'sepia',
    marvin: 'invert',
    phobos: 'blur',
    heat: 'brightness'
  };

  var ScaleEffect = {
    chrome: 1,
    sepia: 1,
    marvin: 100,
    phobos: 3,
    heat: 3
  };


  var editImg = window.setup.editImg;
  var imgPreview = window.setup.imgPreview;
  var form = window.setup.form;


  var slider = editImg.querySelector('.effect-level');

  var lineSlider = slider.querySelector('.effect-level__line');
  var pinSlider = slider.querySelector('.effect-level__pin');
  var depthLine = slider.querySelector('.effect-level__depth');
  var levelValue = slider.querySelector('.effect-level__value');

  var currentFilter;

  levelValue.value = EFFECT_LEVEL_DEFAULT;
  var inputs = form.querySelectorAll('input[type="radio"]');


  slider.classList.add('hidden');

  inputs.forEach(function (item) {
    item.addEventListener('change', function () {
      imgPreview.classList = '';
      imgPreview.classList.add('effects__preview' + '--' + item.value);

      levelValue.value = EFFECT_LEVEL_DEFAULT;
      currentFilter = item.value;
      addFilter(item.value);
      checkSelectedFilter(item, slider, imgPreview);

      pinSlider.style.left = lineSlider.offsetWidth + 'px';
      depthLine.style.width = lineSlider.offsetWidth + 'px';
    });
  });

  pinSlider.addEventListener('mousedown', function (evt) {
    var startCoords = {
      x: evt.clientX,
    };


    var onMouseMove = function (moveEVt) {

      var shift = {
        x: startCoords.x - moveEVt.clientX
      };

      startCoords = {
        x: moveEVt.clientX,
      };

      var currentCoords = {
        x: pinSlider.offsetLeft - shift.x
      };

      if (currentCoords.x > 0 && currentCoords.x < lineSlider.offsetWidth) {
        pinSlider.style.left = (currentCoords.x) + 'px';
        depthLine.style.width = (currentCoords.x) + 'px';
        levelValue.value = Math.round(currentCoords.x * 100 / lineSlider.offsetWidth);
        addFilter(currentFilter);
      }
    };

    var onMouseUp = function () {
      editImg.removeEventListener('mousemove', onMouseMove);
      editImg.removeEventListener('mouseup', onMouseUp);
    };


    editImg.addEventListener('mousemove', onMouseMove);
    editImg.addEventListener('mouseup', onMouseUp);
  });


  var addFilter = function (filter) {
    var intensityEffect = levelValue.value * ScaleEffect[filter] / 100;
    imgPreview.style.filter = CssEffect[filter] + '(' + (intensityEffect) + ')';

    if (filter === Effect.MARVIN) {
      imgPreview.style.filter = CssEffect[filter] + '(' + (intensityEffect) + '%)';
    }

    if (filter === Effect.PHOBOS) {
      imgPreview.style.filter = CssEffect[filter] + '(' + (intensityEffect) + 'px)';
    }
  };

  var checkSelectedFilter = function (filter, el, img) {
    if (filter.value === 'none') {
      img.style.filter = '';
      return el.classList.add('hidden');
    }
    return el.classList.remove('hidden');
  };

  window.effect = {
    EFFECT_LEVEL_DEFAULT: EFFECT_LEVEL_DEFAULT,
    slider: slider,
    levelValue: levelValue
  };
})();
