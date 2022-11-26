const paths = {
  home: {
    index: "/",
    signin: {
      index: "/signin",
      __query: ["signin"],
    },
    profile: {
      index: "/profile",
      __query: ['profile'],
    },
    newEvent: {
      index: "/new-event",
      __query: ["new-event"]
    },
    api: {
      index: '/api',
      __query: ['api'],
      auth: {
        index: '/api/auth',
        __query: ['api', 'auth'],
        login: {
          index: '/api/auth/login',
          __query: ['api', 'auth', 'login']
        },
        logout: {
          index: '/api/auth/logout',
          __query: ['api', 'auth', 'logout']
        },
      }
    }
  },
};

export default paths;
