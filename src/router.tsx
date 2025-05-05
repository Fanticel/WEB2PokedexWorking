import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { createHashRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';

import { paths } from './config/path';

const convert = (queryClient: QueryClient) => (m: any) => {
  const { clientLoader, clientAction, default: Component, ...rest } = m;
  return {
    ...rest,
    loader: clientLoader?.(queryClient),
    action: clientAction?.(queryClient),
    Component,
  };
};

export const createAppRouter = (queryClient: QueryClient) =>
  createHashRouter([
    {
      path: paths.home.path,
      lazy: () => import('./paths/landing').then(convert(queryClient)),
    },
    {
      path: paths.app.root.path,
      children: [
        {
            path: paths.app.about.path,
            lazy: () => import('./paths/app/about').then(convert(queryClient)),
        },
      ],
    },
    {
      path: '*',
      lazy: () => import('./paths/not-found').then(convert(queryClient)),
    },
  ]);

export const AppRouter = () => {
  const queryClient = useQueryClient();

  const router = useMemo(() => createAppRouter(queryClient), [queryClient]);

  return <RouterProvider router={router} />;
};
