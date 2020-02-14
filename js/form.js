import Setup from './setup.js';
import Scale from './scale.js';
import Effect from './effect.js';
import Text from './text.js';


const Key = Setup.Key;
const ParenthesisText = Setup.ParenthesisText;
const CssStyle = Setup.CssStyle;
const main = Setup.main;
const form = Setup.form;
const uploadButton = Setup.uploadButton;
const uploadFile = Setup.uploadFile;
const editImg = Setup.editImg;
const imgPreview = Setup.imgPreview;
const Url = Setup.Url;
const MethodHTTP = Setup.MethodHTTP;

const SCALE_DEFAULT = Scale.SCALE_DEFAULT;
const biggerControl = Scale.biggerControl;
const smallerControl = Scale.smallerControl;
const inputScale = Scale.inputScale;
const addScaleImg = Scale.addScaleImg;
const onControlClick = Scale.onControlClick;

const EFFECT_LEVEL_DEFAULT = Effect.EFFECT_LEVEL_DEFAULT;
const slider = Effect.slider;
const levelValue = Effect.levelValue;

const validHashtags = Text.validHashtags;
const textHashtags = Text.textHashtags;
const textDescription = Text.textDescription;

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const successTemplate = document.querySelector(`#success`)
  .content
  .querySelector(`.success`);

const errorTemplate = document.querySelector(`#error`)
  .content
  .querySelector(`.error`);

const effectsPictures = editImg.querySelectorAll(`.effects__preview`);
const cancelButton = editImg.querySelector(`.cancel`);


let successContainer;
let successInner;
let successButton;

let errorContainer;
let errorInner;
let errorButtons;


uploadFile.addEventListener(`change`, () => {
  changePreview();
  editImg.classList.remove(`hidden`);

  addScaleImg(inputScale, SCALE_DEFAULT, imgPreview);

  levelValue.value = EFFECT_LEVEL_DEFAULT;


  cancelButton.addEventListener(`click`, onButtonClick);
  document.addEventListener(`keydown`, onFormEscPress);
});

textHashtags.addEventListener(`focus`, () => document.removeEventListener(`keydown`, onFormEscPress));
textHashtags.addEventListener(`blur`, () => document.addEventListener(`keydown`, onFormEscPress));

textDescription.addEventListener(`focus`, () => document.removeEventListener(`keydown`, onFormEscPress));
textDescription.addEventListener(`blur`, () => document.addEventListener(`keydown`, onFormEscPress));

smallerControl.addEventListener(`click`, onControlClick);
biggerControl.addEventListener(`click`, onControlClick);

uploadButton.addEventListener(`click`, () => validHashtags(textHashtags.value, textHashtags));

form.addEventListener(`submit`, (evt) => {
  evt.preventDefault();

  let formData = new FormData(form);

  fetch(Url.SAVE, {
    method: MethodHTTP.POST,
    body: formData
  })
  .then((response) => onSuccess(response))
  .catch(onSaveMistake);
});


function onSuccess(response) {
  if (!response.ok) {
    return Promise.reject(response.status);
  }

  closePopup();

  successContainer = successTemplate.cloneNode(true);
  successInner = successContainer.querySelector(`.success__inner`);
  successButton = successContainer.querySelector(`.success__button`);

  successButton.addEventListener(`click`, onAreaClick);

  setupPopup(successContainer, successInner);
  return Promise.resolve();
}

function onSaveMistake() {
  closePopup();

  errorContainer = errorTemplate.cloneNode(true);
  errorInner = errorContainer.querySelector(`.error__inner`);
  errorButtons = errorContainer.querySelectorAll(`.error__button`);

  errorButtons.forEach((button) => button.addEventListener(`click`, onAreaClick));

  setupPopup(errorContainer, errorInner);
}

function onMouseover() {
  document.removeEventListener(`click`, onAreaClick);
  document.removeEventListener(`keydown`, onAreaEscPress);
}

function onMouseout() {
  document.addEventListener(`click`, onAreaClick);
  document.addEventListener(`keydown`, onAreaEscPress);
}

function onAreaClick() {
  if (successContainer) {
    cleanPopup(successContainer, successInner);

    successButton.removeEventListener(`click`, onAreaClick);
  }

  if (errorContainer) {
    cleanPopup(errorContainer, errorInner);

    errorButtons.forEach((button) => button.removeEventListener(`click`, onAreaClick));
  }

  document.removeEventListener(`click`, onAreaClick);
  document.removeEventListener(`keydown`, onAreaEscPress);
}

function onAreaEscPress(evt) {
  if (evt.key === Key.ESC) {
    onAreaClick();
  }
}

function onButtonClick() {
  closePopup();
}

function onFormEscPress(evt) {
  if (evt.key === Key.ESC) {
    closePopup();
  }
}

function closePopup() {
  editImg.classList.add(`hidden`);
  form.reset();
  uploadFile.value = ``;


  imgPreview.className = ``;
  imgPreview.style.filter = ``;
  imgPreview.style.transform = ``;

  slider.classList.add(`hidden`);
  levelValue.value = EFFECT_LEVEL_DEFAULT;

  document.removeEventListener(`keydown`, onFormEscPress);
  cancelButton.removeEventListener(`click`, onButtonClick);
}

function changePreview() {
  let file = uploadFile.files[0];

  if (file) {
    let fileName = file.name.toLowerCase();

    let matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      let fileReader = new FileReader();

      fileReader.addEventListener(`load`, () => {
        imgPreview.src = fileReader.result;

        effectsPictures.forEach((effectPicture) => {
          effectPicture.style.backgroundImage = CssStyle.URL + ParenthesisText.LEFT
            + fileReader.result + ParenthesisText.RIGHT;
        });
      });

      fileReader.readAsDataURL(file);
    }
  }
}

function cleanPopup(container, elements) {
  container.remove();

  elements.removeEventListener(`mouseover`, onMouseover);
  elements.removeEventListener(`mouseout`, onMouseout);
}

function setupPopup(container, elements) {
  elements.addEventListener(`mouseover`, onMouseover);
  elements.addEventListener(`mouseout`, onMouseout);

  main.appendChild(container);

  document.addEventListener(`click`, onAreaClick);
  document.addEventListener(`keydown`, onAreaEscPress);
}
