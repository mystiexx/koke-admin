import http  from './httpService';
import { apiUrl } from '../config.json';
const apiEndpoint = `${apiUrl}/orders`;


export  function getOrders () {
    return http.get(apiEndpoint)
}

export async function removeOrder (id) {
    let response = await http.delete(`${apiEndpoint}/${id}`);
    return response
  }
  

  export async function markViewed (id) {
    let response = await http.delete(`${apiEndpoint}/${id}`);
    return response
  }

  export async function  getReadOrders() {
    let response = await http.get(`${apiEndpoint}/d/read`);
    return response
  }
  
  export async function  getUnReadOrders() {
    let response = await http.get(`${apiEndpoint}/d/unread`);
    return response
  }
  