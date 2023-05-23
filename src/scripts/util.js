import {database, searchParams} from "./database.js";
import {renderArtistPage, searchRender} from "./render-util.js";

const {form, aside, searchResult, statContainers, types} = database;


export const stringCorrector = (string) => string.trim().split('-');


export const onSubmitStart = () => {
  searchResult.innerHTML = `<h3>Загружаем....</h3>`;
  searchResult.innerHTML = '';
};


export const onSubmitError = () => {
  searchResult.innerHTML = `<h3>Не Найдено(((</h3>`;
  searchResult.innerHTML = '';
};


export const typeLangth = (arr, type) => {
  let db = arr.filter(i => i['type'] === type).map(type => type);
  return db.length;
};


export function getMusicFromDatabase(evt) {
  const value = evt.target.elements['search'].value;

  const {token: {key, secret}} = searchParams;

  fetch(`https://api.discogs.com/database/search?q=${value}&key=${key}&secret=${secret}`)
    .then(r => r.json())
    .then(({pagination, results}) => {

      if (searchResult.classList.contains('artist')) {
        searchResult.classList.toggle('artist')
      }

      getTypesCount(statContainers, results, types);
      results.forEach(i => searchResult.appendChild(searchRender(i)));
    })
};


export const getTypesCount = (arr, result, type) => arr.forEach((i, ind) => i.textContent = typeLangth(result, type[ind]));


export async function onLinkResource(evt) {
  if (evt.target.tagName === 'A') {
    evt.preventDefault();

    let resourceUrl = evt.target['href'];

    await fetch(resourceUrl)
      .then(r => r.json())
      .then(data => {
        onSubmitStart();
        return data['resource_url']
      })

      .then(r => {
        fetch(r)
          .then(r => r.json())
          .then(d => {
            searchResult.classList.add('artist');
            searchResult.appendChild(renderArtistPage(d));
          })
      })
  }
};


export async function onSubmit(evt) {
  evt.preventDefault();
  onSubmitStart();

  await getMusicFromDatabase(evt);
};


