import http  from './httpService';
import { apiUrl } from '../config.json';
const apiEndpoint = `${apiUrl}/admins`;


export  function getAdmins () {
    return http.get(apiEndpoint)
}

export async function getSingleAdmin () {
  let response = await http.get(`${apiEndpoint}/admin`);
  return response
}

export async function removeAdmin (id) {
  let response = await http.delete(`${apiEndpoint}/${id}`);
  return response
}

export async function createAdmins(data){
    let response = await http.post(`${apiEndpoint}`, data);
  return response;
}


