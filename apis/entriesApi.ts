import axios from 'axios';

// como la api que se llamará es del mismo servidor de next, no hace falta poner el path inicial "https://", etc.

const entriesApi = axios.create({
  baseURL: '/api'
})

export default entriesApi