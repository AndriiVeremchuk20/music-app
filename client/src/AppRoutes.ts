const AppRoutes = {
  home: "/",
  music: {
    index: "/music",
    add: "/music/add",
    idSound: (id: string) => `/music/${id}`,
  },
  auth: {
    login: "/auth/login",
    registration: "/auth/registration",
  },
  profile: {
    index: "/profile",
  },
};

export default AppRoutes;
