import {getMusicFromDatabase, params} from "./database.js";
import {renderArtistPage} from "./render-util.js";


export const stringCorrector = (string) => string.trim().split('-');


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

 await getMusicFromDatabase(evt);
}


