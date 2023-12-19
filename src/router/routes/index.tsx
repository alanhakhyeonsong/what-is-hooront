import { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';

import App from '@/App';

const Example1 = lazy(() => import('@/pages/example1/Example1'));
const Example2 = lazy(() => import('@/pages/example2/Example2'));

const loading = <div>loading...</div>

export const allRoutes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    /* 중첩 구조 */
    children: [
      {
        path: 'example1',
        element: <Suspense fallback={loading}><Example1 /></Suspense>
      }
    ]
  },
  {
    path: '/example2',
    element: <Suspense fallback={loading}><Example2 /></Suspense>
  }
]