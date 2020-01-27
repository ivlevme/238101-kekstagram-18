'use strict';

(function () {
  var COUNT_VISIBLE_COMMENTS = 5;
  var LENGTH_EMPTY_MASSIVE = 0;
  var START_INDEX_MASSIVE = 0;


  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  var body = document.querySelector('body');
  var bigPicture = document.querySelector('.big-picture');

  var delNodeChilds = window.setup.delNodeChilds;

  var socialContainer = bigPicture.querySelector('.big-picture__social');
  var imgContainer = bigPicture.querySelector('.big-picture__img');
  var cancelButton = bigPicture.querySelector('.big-picture__cancel');

  var commentsContainer = socialContainer.querySelector('.social__comments');
  var likesCount = socialContainer.querySelector('.likes-count');
  var commentsCountСontainer = socialContainer.querySelector('.social__comment-count');
  var description = socialContainer.querySelector('.social__caption');
  var buttonMoreComments = socialContainer.querySelector('.social__comments-loader');

  var allCommentsCount = commentsCountСontainer.querySelector('.comments-count');

  var imgBig = imgContainer.querySelector('img');

  var commentTemplate = commentsContainer.querySelector('.social__comment');


  var allComments;
  var amountVisibleComments = 0;

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

      picture.addEventListener('click', function () {
        genBigPicture(item);
      });

      fragment.appendChild(picture);
    });

    return fragment;
  };

  var genBigPicture = function (picture) {
    body.classList.add('modal-open');


    imgBig.src = picture.url;
    likesCount.textContent = picture.likes;
    description.textContent = picture.description;
    allCommentsCount.textContent = picture.comments.length;

    allComments = picture.comments.slice();

    delNodeChilds(commentsContainer);

    var comments = addComments(allComments);
    commentsContainer.appendChild(comments);

    if (allComments.length !== LENGTH_EMPTY_MASSIVE) {
      buttonMoreComments.classList.remove('visually-hidden');
    }

    buttonMoreComments.addEventListener('click', downloadMoreComments);

    cancelButton.addEventListener('click', onCancelClick);
    document.addEventListener('keydown', onCancelEscPress);

    bigPicture.classList.remove('hidden');
  };

  var onCancelClick = function () {
    body.classList.remove('modal-open');
    buttonMoreComments.classList.add('visually-hidden');
    amountVisibleComments = 0;

    bigPicture.classList.add('hidden');

    buttonMoreComments.removeEventListener('click', downloadMoreComments);
    cancelButton.removeEventListener('click', onCancelClick);
    document.removeEventListener('keydown', onCancelEscPress);
  };

  var onCancelEscPress = function (evt) {
    if (evt.key === 'Escape') {
      onCancelClick();
    }
  };

  var genComments = function (dataComments) {
    var fragment = new DocumentFragment();

    dataComments.forEach(function (item) {
      var comment = commentTemplate.cloneNode(true);

      var imgAvatar = comment.querySelector('.social__picture');
      imgAvatar.src = item.avatar;
      imgAvatar.alt = item.name;

      var text = comment.querySelector('.social__text');
      text.textContent = item.message;

      fragment.appendChild(comment);
    });

    return fragment;
  };


  var addComments = function (comments) {
    if (comments.length >= COUNT_VISIBLE_COMMENTS) {
      amountVisibleComments += COUNT_VISIBLE_COMMENTS;
      updateCountComments(amountVisibleComments);

      return genComments(comments.splice(START_INDEX_MASSIVE, COUNT_VISIBLE_COMMENTS));
    }

    amountVisibleComments += comments.length;
    updateCountComments(amountVisibleComments);

    return genComments(comments.splice(START_INDEX_MASSIVE, comments.length));
  };

  var downloadMoreComments = function () {
    var comments = addComments(allComments);
    commentsContainer.appendChild(comments);

    if (allComments.length === LENGTH_EMPTY_MASSIVE) {
      buttonMoreComments.classList.add('visually-hidden');
    }
  };

  var updateCountComments = function (count) {
    commentsCountСontainer.removeChild(commentsCountСontainer.firstChild);
    commentsCountСontainer.prepend(count + ' из ');
  };


  window.picture = {
    genPicture: genPicture
  };
})();
