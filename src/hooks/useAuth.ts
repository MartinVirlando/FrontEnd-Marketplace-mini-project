import { useMutation, useQuery } from "@tanstack/react-query";
import { login, register, logout, getMe} from "../services/authService";
import { message } from "antd";


//Login
export const useLogin = () => {
    return useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            localStorage.setItem("token", data.token);
            message.success("Login berhasil")
        },
        onError: (error: any) => {
            message.error(error.response?.data?.message || "Login gagal");
        }
    })
}

//Register
export const useRegister = () => {
    return useMutation({
        mutationFn: register,
        onSuccess: (data) => {
            localStorage.setItem("token", data.token);
            message.success("Register berhasil")
        },
        onError: (error: any) => {
            message.error(error.response?.data?.message || "Register gagal");
        }
    })
}

//Logout
export const useLogout = () => {
    return () =>{
        logout();
    }
}


export const useGetMe = () => {
    return useQuery({
        queryKey: ["me"],
        queryFn: getMe,
    })
}
