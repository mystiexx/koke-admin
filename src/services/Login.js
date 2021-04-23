import http  from './httpService';
import { apiUrl } from '../config.json';
const apiEndpoint = `${apiUrl}`;
let token = localStorage.getItem('token')
http.setJwt(token)

export async function authLogin (data) {
  let response =  await http.post(`${apiEndpoint}/admin-auth`, data);
  return response;
}

export async function changePassword (data) {
  try {
    const response = await http.put(`${apiEndpoint}/change_password`, data);
    return response;
  } catch (error) {
    console.error(error);
  }
  
}