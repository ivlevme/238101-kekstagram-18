'use strict';

(function () {
  var PERCENT_SYMBOL = window.setup.PERCENT_SYMBOL;
  var ParenthesisText = window.setup.ParenthesisText;
  var CssStyle = window.setup.CssStyle;

  var SCALE_STEP = 25;
  var SCALE_DEFAULT = 100;

  var ScaleLimit = {
    MIN: 25,
    MAX: 100
  };


  var uploadFile = window.setup.uploadFile;
  var editImg = window.setup.editImg;
  var imgPreview = window.setup.imgPreview;

  var scaleContainer = editImg.querySelector('.scale');

  var smallerControl = scaleContainer.querySelector('.scale__control--smaller');
  var biggerControl = scaleContainer.querySelector('.scale__control--bigger');
  var inputScale = scaleContainer.querySelector('.scale__control--value');

  var valueScale;


  var onControlClick = function (evt) {
    if (evt.target.classList.contains('scale__control--smaller')) {
      return fillScale(valueScale - SCALE_STEP);
    }
    return fillScale(valueScale + SCALE_STEP);
  };

  var fillScale = function (val) {
    valueScale = validScale(val);
    addScaleImg(inputScale, valueScale, imgPreview);
  };

  var addScaleImg = function (input, quantity, img) {
    input.value = quantity + PERCENT_SYMBOL;
    img.style.transform = CssStyle.SCALE + ParenthesisText.LEFT + quantity / ScaleLimit.MAX
      + ParenthesisText.RIGHT;
  };

  var validScale = function (value) {
    if (value > ScaleLimit.MAX) {
      value = ScaleLimit.MAX;
      return value;
    }

    if (value < ScaleLimit.MIN) {
      value = ScaleLimit.MIN;
      return value;
    }

    return value;
  };


  uploadFile.addEventListener('change', function () {
    valueScale = SCALE_DEFAULT;
  });

  window.scale = {
    SCALE_DEFAULT: SCALE_DEFAULT,
    biggerControl: biggerControl,
    smallerControl: smallerControl,
    valueScale: valueScale,
    inputScale: inputScale,
    onControlClick: onControlClick,
    addScaleImg: addScaleImg
  };
})();
