import client from "..";

const baseRoutes = {
  registration: "auth/registration",
  login: "auth/login",
};

const registration = async (user: any) => {
  const response = await client.post<any>(baseRoutes.registration, { user });
  return response.data;
};

const userAuth = {
    registration,
};

export default userAuth;
