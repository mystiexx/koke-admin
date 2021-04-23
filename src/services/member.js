import http  from './httpService';
import { apiUrl } from '../config.json';
const apiEndpoint = `${apiUrl}/users`;

export  function getUsers () {
  return http.get(apiEndpoint)
}

export async function removeMember (id) {
  let response = await http.delete(`${apiEndpoint}/${id}`);
  return response
}