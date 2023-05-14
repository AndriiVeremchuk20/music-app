import client from "..";
import {
  AuthBody,
  AuthResponse,
  RegistrationBody,
  RegistrationResponse,
} from "../types/userAuthTypes";

const baseRoutes = {
  registration: "auth/registration",
  auth: "auth/",
};

const registration = async (data: RegistrationBody) => {
  const response = await client.post<RegistrationResponse>(
    baseRoutes.registration,
    data
  );
  return response.data;
};

// add type request "login" or "authorisation"
const auth = async (data: AuthBody) => {
  const response = await client.post<AuthResponse>(baseRoutes.auth, data);
  return response.data;
};

const userAuth = {
  registration,
  auth,
};

export default userAuth;
