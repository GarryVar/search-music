import {database, searchParams} from "./database.js";
import {renderArtistPage, searchRender} from "./render-util.js";

const {aside, searchResult, statContainers, types} = database;


export const stringCorrector = (string) => string.trim().split('-');


export const onSubmitStart = () => {
  searchResult.innerHTML = `<h3>Загружаем....</h3>`;
  searchResult.innerHTML = '';
};


export const onSubmitError = () => {
  searchResult.innerHTML = `<h3>Не Найдено(((</h3>`;
  searchResult.innerHTML = '';
};

export const typeLangth = (arr, type) => arr.filter(i => i['type'] === type).map(type => type).length;


export function getMusicFromDatabase(evt) {
  const value = evt.target.elements['search'].value;

  const {
    url,
    token: {key, secret},
    param: {keyParam, secretParam, searchParam}
  } = searchParams;

  let searchPostStringParam = `${url}${searchParam}${value}${keyParam}${key}${secretParam}${secret}`;
  fetch(searchPostStringParam)
    .then(r => r.json())
    .then(({pagination, results}) => {

      if (searchResult.classList.contains('artist')) {
        searchResult.classList.toggle('artist')
      }

      console.log(results);

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


