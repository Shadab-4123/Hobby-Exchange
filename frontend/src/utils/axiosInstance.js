import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://hobby-exchange.onrender.com/api',
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
