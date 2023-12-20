import { http, passthrough } from 'msw';

import { todoHandlers } from './todo';

export const handlers = [
  // 비동기로 요청되는 모든 요청이 감지되므로 아래 패턴에 해당되는 요청은 무시하도록 설정
  http.get(/.*\.(ico|ts|tsx|svg|png|scss|css|js|woff|woff2)$/, () => passthrough()),
  ...todoHandlers,
];
