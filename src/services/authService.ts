import api from "./api";
import type {LoginRequest, RegisterRequest, User, AuthResponse} from "../types";

// Fungsi Login

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post("/auth/login", data)
    return response.data;
}

// Fungsi Register

export const register = async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post("/auth/register", data)
    return response.data;
}

// Fungsi Logout

export const logout = async (): Promise<void> => {
   localStorage.removeItem("token");
   window.location.href = "/login";
}

export const getMe = async (): Promise<User> => {
    const response = await api.get("/auth/me");
    return response.data;
}

