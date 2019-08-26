// API/TMDBApi.js

const API_TOKEN = "1af826b4be7b4ba2c448b1f058977e9f";

export function getFilmsFromApiWithSearchedText (text, page) {
  const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text + "&page=" + page
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function getImageFromApi(name)
{
  return 'https://image.tmdb.org/t/p/w500/' + name
}
