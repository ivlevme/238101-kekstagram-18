'use strict';

(function () {
  var PERCENT_SYMBOL = '%';
  var PIXEL_UNIT = 'px';
  var Key = {
    ESC: 'Escape'
  };
  var ParenthesisText = {
    LEFT: '(',
    RIGHT: ')'
  };

  var CssStyle = {
    SCALE: 'scale',
    URL: 'url'
  };

  var main = document.querySelector('main');
  var form = document.querySelector('.img-upload__form');
  var uploadButton = form.querySelector('.img-upload__submit');

  var uploadFile = form.querySelector('#upload-file');
  var editImg = form.querySelector('.img-upload__overlay');

  var previewContainer = editImg.querySelector('.img-upload__preview');
  var imgPreview = previewContainer.querySelector('img');


  var delNodeChilds = function (node) {
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
  };

  window.setup = {
    PERCENT_SYMBOL: PERCENT_SYMBOL,
    PIXEL_UNIT: PIXEL_UNIT,
    Key: Key,
    ParenthesisText: ParenthesisText,
    CssStyle: CssStyle,
    main: main,
    form: form,
    uploadButton: uploadButton,
    uploadFile: uploadFile,
    editImg: editImg,
    imgPreview: imgPreview,
    delNodeChilds: delNodeChilds
  };
})();
