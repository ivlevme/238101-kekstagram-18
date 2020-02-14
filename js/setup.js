const PERCENT_SYMBOL = `%`;
const PIXEL_UNIT = `px`;
const Key = {
  ESC: `Escape`
};
const ParenthesisText = {
  LEFT: `(`,
  RIGHT: `)`
};

const CssStyle = {
  SCALE: `scale`,
  URL: `url`
};

const Url = {
  LOAD: `https://js.dump.academy/kekstagram/data`,
  SAVE: `https://js.dump.academy/kekstagram`
};

const MethodHTTP = {
  GET: `get`,
  POST: `post`
};

const HttpStatus = {
  OK: 200,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

const ErrorMessage = {
  CONNECT: `Произошла ошибка соединения`,
  TIMEOUT: `Запрос не успел выполниться за `,
  RESPONSE: `Статус ответа: `,
};

const main = document.querySelector(`main`);
const form = document.querySelector(`.img-upload__form`);
const uploadButton = form.querySelector(`.img-upload__submit`);

const uploadFile = form.querySelector(`#upload-file`);
const editImg = form.querySelector(`.img-upload__overlay`);

const previewContainer = editImg.querySelector(`.img-upload__preview`);
const imgPreview = previewContainer.querySelector(`img`);


function delNodeChilds(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}


const Setup = {
  PERCENT_SYMBOL,
  PIXEL_UNIT,
  Key,
  ParenthesisText,
  CssStyle,
  Url,
  MethodHTTP,
  HttpStatus,
  ErrorMessage,
  main,
  form,
  uploadButton,
  uploadFile,
  editImg,
  imgPreview,
  delNodeChilds
};

export default Setup;
