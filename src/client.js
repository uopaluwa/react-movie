import axios from 'axios';

const movie_api_options = {
  base_url: 'https://api.themoviedb.org/',
  params: {
    include_adult: false,
    include_video: false,
    api_key: '612eadc02079cdbfdd5b5234bb9bc23b',
    language: 'en-US'
  },
  version: 3
}

axios.defaults.baseURL = `${movie_api_options.base_url}${movie_api_options.version}`
axios.defaults.params = movie_api_options.params


export default axios;