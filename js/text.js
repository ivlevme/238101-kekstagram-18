import Setup from "./setup.js";

const editImg = Setup.editImg;

const MAX_COUNT_HASHTAGS = 5;
const INDEX_FIRST_SYMBOL = 0;
const MIN_LENGTH_HASHTAG = 1;
const MAX_LENGTH_HASHTAG = 20;
const START_INDEX_OTHER_HASHTAG = 1;
const HASHTAG_SYMBOL = `#`;

const HashtagErrorMessage = {
  START: `Хэш-тег должен начинаться с #`,
  MIN_LENGTH: `Хеш-тег не может состоять только из одной решётки`,
  MAX_LENGTH: `максимальная длина одного хэш-тега 20 символов, включая решётку`,
  SPACE: `хэш-теги разделяются пробелами`,
  REPEAT: `один и тот же хэш-тег не может быть использован дважды`,
  MAX_COUNT: `нельзя указать больше пяти хэш-тегов`
};

const textFieldset = editImg.querySelector(`.img-upload__text`);

const textHashtags = textFieldset.querySelector(`.text__hashtags`);
const textDescription = textFieldset.querySelector(`.text__description`);


function validHashtags(text, el) {
  if (text) {
    let hashtags = text.split(` `);

    if (!checkStartHashtag(hashtags)) {
      return el.setCustomValidity(HashtagErrorMessage.START);
    }

    if (!checkMinLengthHashtag(hashtags)) {
      return el.setCustomValidity(HashtagErrorMessage.MIN_LENGTH);
    }

    if (!checkMaxLengthHashtag(hashtags)) {
      return el.setCustomValidity(HashtagErrorMessage.MAX_LENGTH);
    }

    if (!checkSpaceHashtag(hashtags)) {
      return el.setCustomValidity(HashtagErrorMessage.SPACE);
    }

    if (!checkRepeatHashtag(hashtags)) {
      return el.setCustomValidity(HashtagErrorMessage.REPEAT);
    }

    if (hashtags.length > MAX_COUNT_HASHTAGS) {
      return el.setCustomValidity(HashtagErrorMessage.MAX_COUNT);
    }
  }

  return el.setCustomValidity(``);
}

function checkStartHashtag(hashtags) {
  let pass = hashtags.every((hashtag) => {
    return hashtag[INDEX_FIRST_SYMBOL] === HASHTAG_SYMBOL;
  });

  return pass;
}

function checkMinLengthHashtag(hashtags) {
  let pass = hashtags.every((hashtag) => {
    return hashtag.length > MIN_LENGTH_HASHTAG;
  });

  return pass;
}

function checkMaxLengthHashtag(hashtags) {
  let pass = hashtags.every((hashtag) => {
    return hashtag.length <= MAX_LENGTH_HASHTAG;
  });

  return pass;
}

function checkSpaceHashtag(hashtags) {
  let pass = hashtags.every((hashtag) => {
    return !hashtag.includes(HASHTAG_SYMBOL, START_INDEX_OTHER_HASHTAG);
  });

  return pass;
}

function checkRepeatHashtag(hashtags) {
  let nonRepeatingHashtags = [];

  hashtags.forEach((hashtag) => {
    let hashtagLowerCase = hashtag.toLowerCase();

    if (!nonRepeatingHashtags.includes(hashtagLowerCase)) {
      nonRepeatingHashtags.push(hashtagLowerCase);
    }
  });


  if (hashtags.length !== nonRepeatingHashtags.length) {
    return false;
  }
  return true;
}


const Text = {
  validHashtags, textHashtags, textDescription
};

export default Text;
