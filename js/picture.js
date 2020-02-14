import Setup from './setup.js';

const Key = Setup.Key;
const delNodeChilds = Setup.delNodeChilds;

const COUNT_VISIBLE_COMMENTS = 5;
const LENGTH_EMPTY_MASSIVE = 0;
const START_INDEX_MASSIVE = 0;
const TEXT_FOR_COUNT_COMMENTS = ` из `;

const pictureTemplate = document.querySelector(`#picture`)
  .content
  .querySelector(`.picture`);

const body = document.querySelector(`body`);
const bigPicture = document.querySelector(`.big-picture`);

const socialContainer = bigPicture.querySelector(`.big-picture__social`);
const imgContainer = bigPicture.querySelector(`.big-picture__img`);
const cancelButton = bigPicture.querySelector(`.big-picture__cancel`);

const commentsContainer = socialContainer.querySelector(`.social__comments`);
const likesCount = socialContainer.querySelector(`.likes-count`);
const commentsCountСontainer = socialContainer.querySelector(`.social__comment-count`);
const description = socialContainer.querySelector(`.social__caption`);
const buttonMoreComments = socialContainer.querySelector(`.social__comments-loader`);

const allCommentsCount = commentsCountСontainer.querySelector(`.comments-count`);

const imgBig = imgContainer.querySelector(`img`);

const commentTemplate = commentsContainer.querySelector(`.social__comment`);


let allComments;
let amountVisibleComments = 0;


function genPicture(pictures) {
  let fragment = new DocumentFragment();

  pictures.forEach((item) => {
    let picture = pictureTemplate.cloneNode(true);

    let img = picture.querySelector(`.picture__img`);
    img.src = item.url;

    let likesPicture = picture.querySelector(`.picture__likes`);
    likesPicture.textContent = item.likes;

    let commentsPicture = picture.querySelector(`.picture__comments`);
    commentsPicture.textContent = item.comments.length;

    picture.addEventListener(`click`, () => genBigPicture(item));

    fragment.appendChild(picture);
  });

  return fragment;
}

function genBigPicture(picture) {
  body.classList.add(`modal-open`);


  imgBig.src = picture.url;
  likesCount.textContent = picture.likes;
  description.textContent = picture.description;
  allCommentsCount.textContent = picture.comments.length;

  allComments = picture.comments.slice();

  delNodeChilds(commentsContainer);

  let comments = addComments(allComments);
  commentsContainer.appendChild(comments);

  if (allComments.length !== LENGTH_EMPTY_MASSIVE) {
    buttonMoreComments.classList.remove(`visually-hidden`);
  }

  buttonMoreComments.addEventListener(`click`, downloadMoreComments);

  cancelButton.addEventListener(`click`, onCancelClick);
  document.addEventListener(`keydown`, onCancelEscPress);

  bigPicture.classList.remove(`hidden`);
}

function onCancelClick() {
  body.classList.remove(`modal-open`);
  buttonMoreComments.classList.add(`visually-hidden`);
  amountVisibleComments = 0;

  bigPicture.classList.add(`hidden`);

  buttonMoreComments.removeEventListener(`click`, downloadMoreComments);
  cancelButton.removeEventListener(`click`, onCancelClick);
  document.removeEventListener(`keydown`, onCancelEscPress);
}

function onCancelEscPress(evt) {
  if (evt.key === Key.ESC) {
    onCancelClick();
  }
}

function genComments(dataComments) {
  let fragment = new DocumentFragment();

  dataComments.forEach((item) => {
    let comment = commentTemplate.cloneNode(true);

    let imgAvatar = comment.querySelector(`.social__picture`);
    imgAvatar.src = item.avatar;
    imgAvatar.alt = item.name;

    let text = comment.querySelector(`.social__text`);
    text.textContent = item.message;

    fragment.appendChild(comment);
  });

  return fragment;
}


function addComments(comments) {
  if (comments.length >= COUNT_VISIBLE_COMMENTS) {
    amountVisibleComments += COUNT_VISIBLE_COMMENTS;
    updateCountComments(amountVisibleComments);

    return genComments(comments.splice(START_INDEX_MASSIVE, COUNT_VISIBLE_COMMENTS));
  }

  amountVisibleComments += comments.length;
  updateCountComments(amountVisibleComments);

  return genComments(comments.splice(START_INDEX_MASSIVE, comments.length));
}

function downloadMoreComments() {
  let comments = addComments(allComments);
  commentsContainer.appendChild(comments);

  if (allComments.length === LENGTH_EMPTY_MASSIVE) {
    buttonMoreComments.classList.add(`visually-hidden`);
  }
}

function updateCountComments(count) {
  commentsCountСontainer.removeChild(commentsCountСontainer.firstChild);
  commentsCountСontainer.prepend(count + TEXT_FOR_COUNT_COMMENTS);
}


const Picture = {
  genPicture
};

export default Picture;
