import axios from 'axios';

// Define the base URL from environment variable or fallback to default
const API_URL = import.meta.env.VITE_API_URL || 'https://hobby-exchange.onrender.com/api';  // Default URL is set here

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: API_URL,  // Ensure this is correctly set to the base URL for your API
    headers: {
        'Content-Type': 'application/json',  // Default headers
    },
});

// Add a request interceptor to include the token in the Authorization header
axiosInstance.interceptors.request.use(
    (config) => {
        // Fetch the token from localStorage (or wherever you store it)
        const token = localStorage.getItem('token');
        if (token) {
            // Attach token to the request headers if it exists
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Handle request errors (e.g., network errors)
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle global error responses
axiosInstance.interceptors.response.use(
    (response) => {
        // Manipulate the response here if needed (e.g., log the response data)
        return response;
    },
    (error) => {
        // Handle errors globally
        if (error.response) {
            // Handle specific HTTP error statuses
            if (error.response.status === 401) {
                // Unauthorized error: token might have expired, log out the user
                localStorage.removeItem('token');
                // Optionally redirect to login or show a message
            } else {
                // Handle other HTTP error statuses (e.g., 500, 404, etc.)
                console.error('Request failed with status:', error.response.status);
            }
        } else {
            // Handle network or connection errors
            console.error('Network or connection error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
