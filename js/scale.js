import Setup from './setup.js';

const PERCENT_SYMBOL = Setup.PERCENT_SYMBOL;
const ParenthesisText = Setup.ParenthesisText;
const CssStyle = Setup.CssStyle;
const uploadFile = Setup.uploadFile;
const editImg = Setup.editImg;
const imgPreview = Setup.imgPreview;

const SCALE_STEP = 25;
const SCALE_DEFAULT = 100;

const ScaleLimit = {
  MIN: 25,
  MAX: 100
};

const scaleContainer = editImg.querySelector(`.scale`);

const smallerControl = scaleContainer.querySelector(`.scale__control--smaller`);
const biggerControl = scaleContainer.querySelector(`.scale__control--bigger`);
const inputScale = scaleContainer.querySelector(`.scale__control--value`);


let valueScale;

uploadFile.addEventListener(`change`, () => (valueScale = SCALE_DEFAULT));


function onControlClick(evt) {
  if (evt.target.classList.contains(`scale__control--smaller`)) {
    return fillScale(valueScale - SCALE_STEP);
  }
  return fillScale(valueScale + SCALE_STEP);
}

function fillScale(val) {
  valueScale = validScale(val);
  addScaleImg(inputScale, valueScale, imgPreview);
}

function addScaleImg(input, quantity, img) {
  input.value = quantity + PERCENT_SYMBOL;
  img.style.transform = CssStyle.SCALE + ParenthesisText.LEFT + quantity / ScaleLimit.MAX
    + ParenthesisText.RIGHT;
}

function validScale(value) {
  if (value > ScaleLimit.MAX) {
    value = ScaleLimit.MAX;
    return value;
  }

  if (value < ScaleLimit.MIN) {
    value = ScaleLimit.MIN;
    return value;
  }

  return value;
}


const Scale = {
  SCALE_DEFAULT,
  biggerControl,
  smallerControl,
  valueScale,
  inputScale,
  onControlClick,
  addScaleImg
};

export default Scale;
