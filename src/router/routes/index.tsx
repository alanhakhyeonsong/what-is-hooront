import { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';

import App from '@/App';
import { CommonLayout } from '@/layouts/CommonLayout';

const Example1 = lazy(() => import('@/pages/example1/Example1'));
const About = lazy(() => import('@/pages/about/About'));
const TodoList = lazy(() => import('@/pages/todo/List'));
const TodoEdit = lazy(() => import('@/pages/todo/Edit'));

const loading = <div>loading...</div>

export const allRoutes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    /* 중첩 구조 */
    children: [
      {
        path: '',
        element: <Suspense fallback={loading}><CommonLayout /></Suspense>,
        children: [
          {
            path: '/',
            element: <Suspense fallback={loading}><Example1 /></Suspense>
          },
          {
            path: '/about',
            element: <Suspense fallback={loading}><About /></Suspense>
          },
          {
            path: '/todo',
            element: <Suspense fallback={loading}><TodoList /></Suspense>
          },
          {
            path: '/todo/edit/:todoId',
            element: <Suspense fallback={loading}><TodoEdit /></Suspense>
          }
        ],
      },
    ]
  },
]