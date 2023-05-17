import {params} from "./database.js";
import {searchRender, renderArtistPage} from "./render-util.js";



export const  stringCorrector = (string) => string.trim().split('-');



export const onSubmitStart = () => {
  params.searchResult.innerHTML = `<h3>Загружаем....</h3>`;
  params.searchResult.innerHTML = '';
};



export const onSubmitError = () => {
  params.searchResult.innerHTML = `<h3>Не Найдено(((</h3>`;
  params.searchResult.innerHTML = '';
};



export async function onLinkResource(evt) {
  if (evt.target.tagName === 'A') {
    evt.preventDefault();

    let resourceUrl = evt.target['href'];

    await fetch(resourceUrl)
      .then(r => r.json())
      .then(data => {
        console.log(data);
        onSubmitStart();

        params.searchResult.classList.add('artist');
        params.searchResult.appendChild(renderArtistPage(data));
      });
  }
}



export async function onSubmit(evt) {
  evt.preventDefault();
  onSubmitStart();

  const value = evt.target.elements['search'].value;

  await fetch(`https://api.discogs.com/database/search?q=${value}&key=${params.token.key}&secret=${params.token.secret}`)
    .then(r => r.json())
    .then(({pagination, results}) => {


        if (params.searchResult.classList.contains('artist')) {
          params.searchResult.classList.toggle('artist')
        }


        let artists = results.filter(i => i['type'] === 'master');

        console.log(artists);

        artists.forEach(i => params.searchResult.appendChild(searchRender(i)));
      }
    )
}


