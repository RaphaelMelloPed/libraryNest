import axios from 'axios'

const fetchApi = axios.create({
    baseURL: "http://localhost:3000",
    responseType: "json"
})

export default fetchApi;
