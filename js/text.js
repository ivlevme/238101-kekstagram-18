'use strict';

(function () {
  var MAX_COUNT_HASHTAGS = 5;
  var INDEX_FIRST_SYMBOL = 0;
  var MIN_LENGTH_HASHTAG = 1;
  var MAX_LENGTH_HASHTAG = 20;
  var START_INDEX_OTHER_HASHTAG = 1;
  var HASHTAG_SYMBOL = '#';

  var HashtagErrorMessage = {
    START: 'Хэш-тег должен начинаться с #',
    MIN_LENGTH: 'Хеш-тег не может состоять только из одной решётки',
    MAX_LENGTH: 'максимальная длина одного хэш-тега 20 символов, включая решётку',
    SPACE: 'хэш-теги разделяются пробелами',
    REPEAT: 'один и тот же хэш-тег не может быть использован дважды',
    MAX_COUNT: 'нельзя указать больше пяти хэш-тегов'
  };

  var editImg = window.setup.editImg;


  var textFieldset = editImg.querySelector('.img-upload__text');

  var textHashtags = textFieldset.querySelector('.text__hashtags');
  var textDescription = textFieldset.querySelector('.text__description');

  var validHashtags = function (text, el) {
    if (text) {
      var hashtags = text.split(' ');

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

    return el.setCustomValidity('');
  };

  var checkStartHashtag = function (hashtags) {
    var pass = hashtags.every(function (hashtag) {
      return hashtag[INDEX_FIRST_SYMBOL] === HASHTAG_SYMBOL;
    });

    return pass;
  };

  var checkMinLengthHashtag = function (hashtags) {
    var pass = hashtags.every(function (hashtag) {
      return hashtag.length > MIN_LENGTH_HASHTAG;
    });

    return pass;
  };

  var checkMaxLengthHashtag = function (hashtags) {
    var pass = hashtags.every(function (hashtag) {
      return hashtag.length <= MAX_LENGTH_HASHTAG;
    });

    return pass;
  };

  var checkSpaceHashtag = function (hashtags) {
    var pass = hashtags.every(function (hashtag) {
      return !hashtag.includes(HASHTAG_SYMBOL, START_INDEX_OTHER_HASHTAG);
    });

    return pass;
  };

  var checkRepeatHashtag = function (hashtags) {
    var nonRepeatingHashtags = hashtags.filter(function (hashtag, position) {
      hashtag = hashtag.toLowerCase();
      return hashtags.indexOf(hashtag) === position;
    });


    if (hashtags.length !== nonRepeatingHashtags.length) {
      return false;
    }
    return true;
  };


  window.text = {
    validHashtags: validHashtags,
    textHashtags: textHashtags,
    textDescription: textDescription
  };
})();
