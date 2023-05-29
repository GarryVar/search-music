export const searchParams = {
  url: 'https://api.discogs.com/database/',
  token: {
    secret: 'mNHcAvOinUcwHakAVnJbLZDKTHMXfogm',
    key: 'vDFrSJVinLBdseXePtFc'
  },
  param: {
    keyParam: `&key=`,
    searchParam: `search?q=`,
    secretParam: `&secret=`,
  }
};

export const database = {
  searchResult : document.querySelector('.result__list'),
  types: ['artist', 'release', 'master'],
  statContainers: Array.from(document.querySelectorAll('.js-stat')),
};


