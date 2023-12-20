import { setupWorker } from 'msw/browser';

import { handlers } from './handlers';

/**
 * msw(Mock Service Worker)를 실행합니다.
 * @returns
 */
export const setupMockServer = (): Promise<ServiceWorkerRegistration | undefined | void> => {
  const worker = setupWorker(...handlers);
  return worker.start();
};
