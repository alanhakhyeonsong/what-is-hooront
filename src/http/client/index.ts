import { type AxiosInstance } from 'axios';
import qs from 'qs';

import { HttpClient } from './httpClient';

// HttpClient 생성
const httpClient = new HttpClient({
  baseURL: 'https://www.ramos.com', // TODO: env 분리
  paramsSerializer: (params) => {
    return qs.stringify(params, { arrayFormat: 'repeat' });
  },
});


export const getHttp = (): AxiosInstance => httpClient.axiosInstance;