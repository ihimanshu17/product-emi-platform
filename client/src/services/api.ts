import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const customError = {
      message:
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        'An unexpected network error occurred',
      status: error.response?.status || 500,
    };
    return Promise.reject(customError);
  }
);
