import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';

import { setupMockServer } from './mock-server';
import { router } from './router';
import { queryClient } from './utils/reactQuery';

// mock server 사용 환경에서만 msw 서버 초기화
if (import.meta.env.VITE_MOCK === 'Y') {
  await setupMockServer();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
)
