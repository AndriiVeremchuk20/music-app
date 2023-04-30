import { User } from "@/types/user";

type AuthType = "Login"|"Auth";

export interface AuthBody {
    uid: string;
    type: AuthType;
};

export interface AuthResponse {
    message: string;
    user: User;
};

export interface RegistrationBody {
    uid: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface RegistrationResponse {
    message: string;
    id: string;
};
