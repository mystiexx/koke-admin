import axios from "axios";
import logger from "./logService";
import { SweetAlert } from "react-bootstrap-sweetalert";


axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    logger.log(error);
    SweetAlert.error("An unexpected error occurrred.");
  }

  return Promise.reject(error);
});

function setJwt(jwt){
axios.defaults.headers.common["x-auth-token"] = jwt;

}

const constants = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt
}
export default constants
