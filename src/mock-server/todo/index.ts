import { http } from 'msw';

import { API_BASE_URL } from '@/mock-server/constants';

import * as todo from './response';

export const todoHandlers = [
  http.get(`${API_BASE_URL}/todo`, todo.getList),
  http.get(`${API_BASE_URL}/todo/*`, todo.getView),
];