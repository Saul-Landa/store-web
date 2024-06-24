import axios from "axios";

const BASE_URL = "http://localhost:8090/api"

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 9000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }
});

api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if ( token ) {
        config.headers.authorization = "Bearer " + token;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  export default api;