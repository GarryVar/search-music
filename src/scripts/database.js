export const searchParams = {
  token: {
    secret: 'mNHcAvOinUcwHakAVnJbLZDKTHMXfogm',
    key: 'vDFrSJVinLBdseXePtFc'
  }
};

export const database = {
  form : document.querySelector('.search__form'),
  searchResult : document.querySelector('.result__layout'),
  aside: document.querySelector('.stat__content'),
  types: ['artist', 'release', 'master'],
  statContainers: Array.from(document.querySelectorAll('.js-stat')),
};
