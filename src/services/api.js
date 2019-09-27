import axios from 'axios';

const api = axios.create({
    baseURL: 'https://sirva-me.herokuapp.com'
});

export default api;