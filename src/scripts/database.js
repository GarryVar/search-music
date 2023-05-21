import {renderArtistPage, searchRender} from "./render-util.js";
import {typeLangth} from "./util.js";

export const params = {
  token: {
    secret: 'mNHcAvOinUcwHakAVnJbLZDKTHMXfogm',
    key: 'vDFrSJVinLBdseXePtFc'
  },
  form : document.querySelector('.search__form'),
  searchResult : document.querySelector('.result__layout'),
  aside: document.querySelector('.aside')
};

export function getMusicFromDatabase(evt) {
  const value = evt.target.elements['search'].value;

  fetch(`https://api.discogs.com/database/search?q=${value}&key=${params.token.key}&secret=${params.token.secret}`)
    .then(r => r.json())
    .then(({pagination, results}) => {
      console.log(results);

      if (params.searchResult.classList.contains('artist')) {
        params.searchResult.classList.toggle('artist')
      }

      const type = {
        artistLength: typeLangth(results, 'artist'),
        releaseLength: typeLangth(results, 'release'),
        masterLength: typeLangth(results, 'master')
      }


      params.aside.innerHTML = `
        <div>Artists:<span>${type.artistLength}</span></div>
        <div>Releases:<span>${type.releaseLength}<span></div>
        <div>Masters:<span>${type.masterLength}</span></div>
`;
      results.forEach(i => params.searchResult.appendChild(searchRender(i)));
    })
}
