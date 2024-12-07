// src/axiosConfig.js
import axios from 'axios';

// Define the base URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Adjust based on your auth implementation
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
