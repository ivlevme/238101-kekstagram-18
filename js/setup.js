'use strict';

(function () {
  var main = document.querySelector('main');
  var form = document.querySelector('.img-upload__form');
  var uploadButton = form.querySelector('.img-upload__submit');

  var uploadFile = form.querySelector('#upload-file');
  var editImg = form.querySelector('.img-upload__overlay');

  var previewContainer = editImg.querySelector('.img-upload__preview');
  var imgPreview = previewContainer.querySelector('img');

  window.setup = {
    main: main,
    form: form,
    uploadButton: uploadButton,
    uploadFile: uploadFile,
    editImg: editImg,
    imgPreview: imgPreview
  };
})();
