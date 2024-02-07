import axios from 'axios';


export const httpClient = axios.create({
  baseURL: 'http://192.168.0.105:3001',
});
