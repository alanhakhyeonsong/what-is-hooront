import { type AxiosInstance } from 'axios';
import qs from 'qs';

import { HttpClient } from './httpClient';

// HttpClient 생성
const httpClient = new HttpClient({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  paramsSerializer: (params) => {
    return qs.stringify(params, { arrayFormat: 'repeat' });
  },
});


export const getHttp = (): AxiosInstance => httpClient.axiosInstance;