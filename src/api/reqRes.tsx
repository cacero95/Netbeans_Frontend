import axios from "axios";

export const Backend = axios.create({
    baseURL: 'https://architecturerestserver.herokuapp.com/api/'
})