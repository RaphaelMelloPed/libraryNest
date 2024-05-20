import axios from 'axios'

const fetchApi = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL_API,
    responseType: "json"
})

export default fetchApi;
