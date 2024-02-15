import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { getToken } from './token';
import { toast } from 'react-toastify';

const BACKEND_URL = 'https://12.react.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers['x-token'] = token;
      }

      return config;
    },
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{error: string}>) => {
      if (error.response && error.response.status !== 401) {
        toast.warn(error.response.data.error);
      }

      throw error;
    }
  );

  return api;
};
