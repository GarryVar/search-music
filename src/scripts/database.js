import {renderArtistPage, searchRender} from "./render-util.js";

export const params = {
  token: {
    secret: 'mNHcAvOinUcwHakAVnJbLZDKTHMXfogm',
    key: 'vDFrSJVinLBdseXePtFc'
  },
  form : document.querySelector('.search__form'),
  searchResult : document.querySelector('.result-wrap'),
};

export function getMusicFromDatabase(evt) {
  const value = evt.target.elements['search'].value;

  fetch(`https://api.discogs.com/database/search?q=${value}&key=${params.token.key}&secret=${params.token.secret}`)
    .then(r => r.json())
    .then(({pagination, results}) => {

      if (params.searchResult.classList.contains('artist')) {
        params.searchResult.classList.toggle('artist')
      }

      const images = results.map(i => i['cover_image']);

      let artists = results.filter(i => i['type'] === 'master');
      artists.forEach(i => params.searchResult.appendChild(searchRender(i)));

    })
}
