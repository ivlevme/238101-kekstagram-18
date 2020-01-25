'use strict';

(function () {
  var editImg = window.setup.editImg;


  var textFieldset = editImg.querySelector('.img-upload__text');

  var textHashtags = textFieldset.querySelector('.text__hashtags');
  var textDescription = textFieldset.querySelector('.text__description');

  var validHashtags = function (text, el) {
    if (text) {
      var hashtags = text.split(' ');

      if (!checkStartHashtag(hashtags)) {
        return el.setCustomValidity('Хэш-тег должен начинаться с #');
      }

      if (!checkMinLengthHashtag(hashtags)) {
        return el.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
      }

      if (!checkMaxLengthHashtag(hashtags)) {
        return el.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку');
      }

      if (!checkSpaceHashtag(hashtags)) {
        return el.setCustomValidity('хэш-теги разделяются пробелами');
      }

      if (!checkRepeatHashtag(hashtags)) {
        return el.setCustomValidity('один и тот же хэш-тег не может быть использован дважды');
      }

      if (hashtags.length > 5) {
        return el.setCustomValidity('нельзя указать больше пяти хэш-тегов');
      }
    }

    return el.setCustomValidity('');
  };

  var checkStartHashtag = function (hashtags) {
    var pass = hashtags.every(function (hashtag) {
      return hashtag[0] === '#';
    });

    return pass;
  };

  var checkMinLengthHashtag = function (hashtags) {
    var pass = hashtags.every(function (hashtag) {
      return hashtag.length > 1;
    });

    return pass;
  };

  var checkMaxLengthHashtag = function (hashtags) {
    var pass = hashtags.every(function (hashtag) {
      return hashtag.length <= 20;
    });

    return pass;
  };

  var checkSpaceHashtag = function (hashtags) {
    var pass = hashtags.every(function (hashtag) {
      return !hashtag.includes('#', 1);
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
