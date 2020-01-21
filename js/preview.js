'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var commentsContainer = bigPicture.querySelector('.social__comments');
  var commentTemplate = commentsContainer.querySelector('.social__comment');

  // bigPicture.classList.remove('hidden');


  var genPreview = function (pictures) {
    var picture = pictures[5];

    cleanComments(commentsContainer);
    fillComments(picture.comments);

    var description = bigPicture.querySelector('.social__caption');
    var img = bigPicture.querySelector('.big-picture__img').querySelector('img');
    var likeCount = bigPicture.querySelector('.likes-count');
    var commentCount = bigPicture.querySelector('.comments-count');
    var commentsLoader = bigPicture.querySelector('.comments-loader');
    var commentsCounter = bigPicture.querySelector('.social__comment-count');

    img.src = picture.url;
    description.textContent = picture.description;
    likeCount.textContent = picture.likes;
    commentCount.textContent = picture.comments.length;

    commentsCounter.classList.add('visually-hidden');
    commentsLoader.classList.add('visually-hidden');
  };

  var fillComments = function (dataComments) {
    var comments = genComments(dataComments);
    commentsContainer.appendChild(comments);
  };

  var genComments = function (comments) {
    var fragment = new DocumentFragment();

    comments.forEach(function (item) {
      var comment = commentTemplate.cloneNode(true);
      var avatar = comment.querySelector('.social__picture');
      var message = comment.querySelector('.social__text');

      avatar.src = item.avatar;
      avatar.alt = item.name;
      message.textContent = item.message;
      fragment.appendChild(comment);
    });

    return fragment;
  };

  var cleanComments = function (container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  };


  window.preview = {
    genPreview: genPreview
  };
})();
