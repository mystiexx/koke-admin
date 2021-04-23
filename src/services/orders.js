import http  from './httpService';
import { apiUrl } from '../config.json';
const apiEndpoint = `${apiUrl}/orders`;


export  function getOrders () {
    return http.get(apiEndpoint)
}

