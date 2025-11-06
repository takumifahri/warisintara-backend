import { userRole } from "./user";

interface LoginRequest {
    username: string;
    password: string;
}

interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    expiredAt: string;
    data: {
        id: string;
        uniqueId: string;
        username: string;
        email: string;
        name: string;
        role: userRole;
        createdAt: string;
        updatedAt: string;
    }
}

interface RegisterRequest {
    username: string;
    password: string;
    email: string;
    name: string;
}

interface RegisterResponse {
    id: string;
    uniqueId: string;
    username: string;
    email: string;
    name: string;
    role: userRole;
    createdAt: string;
    updatedAt: string;
}


export type {
    LoginRequest, 
    LoginResponse, 
    RegisterRequest, 
    RegisterResponse
};
