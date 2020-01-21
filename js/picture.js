'use strict';

(function () {
  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');


  var genPicture = function (pictures) {
    var fragment = new DocumentFragment();
    pictures.forEach(function (item) {
      var picture = pictureTemplate.cloneNode(true);

      var img = picture.querySelector('.picture__img');
      img.src = item.url;

      var likesPicture = picture.querySelector('.picture__likes');
      likesPicture.textContent = item.likes;

      var commentsPicture = picture.querySelector('.picture__comments');
      commentsPicture.textContent = item.comments.length;

      fragment.appendChild(picture);
    });
    return fragment;
  };

  window.picture = {
    genPicture: genPicture
  };
})();
