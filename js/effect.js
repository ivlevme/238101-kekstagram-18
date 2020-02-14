import Setup from './setup.js';

const PIXEL_UNIT = Setup.PIXEL_UNIT;
const PERCENT_SYMBOL = Setup.PERCENT_SYMBOL;
const ParenthesisText = Setup.ParenthesisText;
const editImg = Setup.editImg;
const imgPreview = Setup.imgPreview;
const form = Setup.form;

const EFFECT_LEVEL_DEFAULT = 100;
const SCALE_MAX = 100;
const MIN_COORD = 0;

const NameEffect = {
  CHROME: `chrome`,
  SEPIA: `sepia`,
  MARVIN: `marvin`,
  PHOBOS: `phobos`,
  HEAT: `heat`
};

const CssEffect = {
  chrome: `grayscale`,
  sepia: `sepia`,
  marvin: `invert`,
  phobos: `blur`,
  heat: `brightness`
};

const ScaleEffect = {
  chrome: 1,
  sepia: 1,
  marvin: 100,
  phobos: 3,
  heat: 3
};


function Coord(x) {
  this.x = x;
}


const slider = editImg.querySelector(`.effect-level`);

const lineSlider = slider.querySelector(`.effect-level__line`);
const pinSlider = slider.querySelector(`.effect-level__pin`);
const depthLine = slider.querySelector(`.effect-level__depth`);
const levelValue = slider.querySelector(`.effect-level__value`);

const switchesFilter = form.querySelectorAll(`input[type="radio"]`);

let currentFilter;
levelValue.value = EFFECT_LEVEL_DEFAULT;


slider.classList.add(`hidden`);

switchesFilter.forEach((item) => {
  item.addEventListener(`change`, () => {
    imgPreview.classList = ``;
    imgPreview.classList.add(`effects__preview` + `--` + item.value);

    levelValue.value = EFFECT_LEVEL_DEFAULT;
    currentFilter = item.value;
    addFilter(item.value);
    checkSelectedFilter(item, slider, imgPreview);

    pinSlider.style.left = lineSlider.offsetWidth + PIXEL_UNIT;
    depthLine.style.width = lineSlider.offsetWidth + PIXEL_UNIT;
  });
});

pinSlider.addEventListener(`mousedown`, (evt) => {
  let startCoords = new Coord(evt.clientX);

  function onMouseMove(moveEVt) {
    let shift = new Coord(startCoords.x - moveEVt.clientX);
    startCoords = new Coord(moveEVt.clientX);
    let currentCoords = new Coord(pinSlider.offsetLeft - shift.x);


    if (currentCoords.x > MIN_COORD && currentCoords.x < lineSlider.offsetWidth) {
      pinSlider.style.left = (currentCoords.x) + PIXEL_UNIT;
      depthLine.style.width = (currentCoords.x) + PIXEL_UNIT;
      levelValue.value = Math.round(currentCoords.x * SCALE_MAX / lineSlider.offsetWidth);
      addFilter(currentFilter);
    }
  }

  function onMouseUp() {
    editImg.removeEventListener(`mousemove`, onMouseMove);
    editImg.removeEventListener(`mouseup`, onMouseUp);
  }


  editImg.addEventListener(`mousemove`, onMouseMove);
  editImg.addEventListener(`mouseup`, onMouseUp);
});


function addFilter(filter) {
  let intensityEffect = levelValue.value * ScaleEffect[filter] / SCALE_MAX;
  imgPreview.style.filter = CssEffect[filter] + ParenthesisText.LEFT + (intensityEffect)
    + ParenthesisText.RIGHT;

  if (filter === NameEffect.MARVIN) {
    imgPreview.style.filter = CssEffect[filter] + ParenthesisText.LEFT + (intensityEffect)
      + PERCENT_SYMBOL + ParenthesisText.RIGHT;
  }

  if (filter === NameEffect.PHOBOS) {
    imgPreview.style.filter = CssEffect[filter] + ParenthesisText.LEFT + (intensityEffect)
      + PIXEL_UNIT + ParenthesisText.RIGHT;
  }
}

function checkSelectedFilter(filter, el, img) {
  if (filter.value === `none`) {
    img.style.filter = ``;
    return el.classList.add(`hidden`);
  }
  return el.classList.remove(`hidden`);
}


const Effect = {
  EFFECT_LEVEL_DEFAULT,
  slider,
  levelValue
};

export default Effect;
