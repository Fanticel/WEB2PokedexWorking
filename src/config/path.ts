export const paths = {
    home: {
      path: '/',
      getHref: () => '/',
    },
    landing: {
      path: 'landing',
      getHref: () => '/landing'
    },
    app: {
      root: {
        path: '/app',
        getHref: () => '/app',
      },
      about: {
        path: 'about',
        getHref: () => '/app/about',
      }
    },

  } as const;
  