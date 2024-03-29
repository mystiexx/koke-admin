import http  from './httpService';
import { apiUrl } from '../config.json';
const apiEndpoint = `${apiUrl}/products`;


export  function getProducts () {
    return http.get(apiEndpoint)
}


export async function postProducts(data) {
    let response = await http.post(`${apiEndpoint}`, data);
    return response;
}

export async function removeProduct (id) {
    let response = await http.delete(`${apiEndpoint}/${id}`);
    return response
  }
  