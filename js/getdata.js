import Setup from './setup.js';
import Filter from './filter.js';

const Url = Setup.Url;
const updatePictures = Filter.updatePictures;

const filtersContainer = document.querySelector(`.img-filters`);
const selectedFilter = document.querySelector(`.img-filters__button--active`);


fetch(Url.LOAD)
  .then(checkStatus)
  .then(renderPosts)
  .catch((message) => onError(message));

// getPosts();


function onError(message) {
  throw new Error(message);
}

function checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response.json());
  }

  return Promise.reject(response.status);
}

function renderPosts(posts) {
  updatePictures(selectedFilter.id, posts);

  filtersContainer.classList.remove(`img-filters--inactive`);
}

// async function getPosts() {
//   let response = await fetch(Url.LOAD);
//   if (response.ok) {
//     let posts = await response.json();

//     return renderPosts(posts);
//   }

//   return onError(response.status)
// }
