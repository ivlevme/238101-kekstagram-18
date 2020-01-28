'use strict';

(function () {
  var PIXEL_UNIT = window.setup.PIXEL_UNIT;
  var PERCENT_SYMBOL = window.setup.PERCENT_SYMBOL;
  var ParenthesisText = window.setup.ParenthesisText;

  var EFFECT_LEVEL_DEFAULT = 100;
  var SCALE_MAX = 100;
  var MIN_COORD = 0;

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

  var Coord = function (x) {
    this.x = x;
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

      pinSlider.style.left = lineSlider.offsetWidth + PIXEL_UNIT;
      depthLine.style.width = lineSlider.offsetWidth + PIXEL_UNIT;
    });
  });

  pinSlider.addEventListener('mousedown', function (evt) {
    var startCoords = new Coord(evt.clientX);

    var onMouseMove = function (moveEVt) {
      var shift = new Coord(startCoords.x - moveEVt.clientX);
      startCoords = new Coord(moveEVt.clientX);
      var currentCoords = new Coord(pinSlider.offsetLeft - shift.x);


      if (currentCoords.x > MIN_COORD && currentCoords.x < lineSlider.offsetWidth) {
        pinSlider.style.left = (currentCoords.x) + PIXEL_UNIT;
        depthLine.style.width = (currentCoords.x) + PIXEL_UNIT;
        levelValue.value = Math.round(currentCoords.x * SCALE_MAX / lineSlider.offsetWidth);
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
    var intensityEffect = levelValue.value * ScaleEffect[filter] / SCALE_MAX;
    imgPreview.style.filter = CssEffect[filter] + ParenthesisText.LEFT + (intensityEffect)
      + ParenthesisText.RIGHT;

    if (filter === Effect.MARVIN) {
      imgPreview.style.filter = CssEffect[filter] + ParenthesisText.LEFT + (intensityEffect)
        + PERCENT_SYMBOL + ParenthesisText.RIGHT;
    }

    if (filter === Effect.PHOBOS) {
      imgPreview.style.filter = CssEffect[filter] + ParenthesisText.LEFT + (intensityEffect)
        + PIXEL_UNIT + ParenthesisText.RIGHT;
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
