import axios from 'axios';
const { REACT_APP_BASE_URL } = process.env;
console.log(REACT_APP_BASE_URL);

const apiConfig = {
  baseURL: REACT_APP_BASE_URL,
  headers: {
    Accept: 'application/json',
  },
};

const token = localStorage.getItem('token');
if (token) {
  apiConfig.headers['Content-Type'] = 'multipart/form-data';
  apiConfig.headers['Authorization'] = 'ABCDE';
} else {
  apiConfig.headers['Content-Type'] = 'application/json';
}

const Api = axios.create(apiConfig);

Api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error?.response?.status === 401 || error?.response?.status === 500) {
      console.log(error);
    }
    return Promise.reject(error);
  }
);

export default Api;
