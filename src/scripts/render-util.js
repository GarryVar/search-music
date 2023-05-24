import {onLinkResource, stringCorrector} from "./util.js";


/*Render search layout*/
export const searchRender = (item) => {
  let newElem = document.createElement('div');


  newElem.classList.add('search__item');
  newElem.innerHTML = `
        <img src="${item['cover_image']}" class="search__cover" id="cover" alt="${item['title']}" loading="lazy">
        <span>
          <a class="search__master" href="${item['resource_url']}">${stringCorrector(item['title']).splice(1, 1)}</a>
        </span>
        <span><a class="search__title" href="${item['resource_url']}">${stringCorrector(item['title']).splice(0, 1)}</a></span>`;


  const link = Array.from(document.querySelectorAll('.search__item a'));
  link.forEach(i => i.addEventListener('click', onLinkResource));

  return newElem;
};


/*Render artist layout*/
export const renderArtistPage = (item) => {

  let artistPage = document.createElement('div');

  artistPage.classList.add('artist__page');
  artistPage.id = item['id'];
  artistPage.dataset.artist = item['name'];
  artistPage.innerHTML = `<h1>${item['name']}</h1>
    <div class="artist__info">
        <div class="artist__profile">${item['profile']}</div>
        <span>Discogs page</span> <a href="${item['uri']}">${item['uri']}</a>
    </div>
`;
  return artistPage;
}
