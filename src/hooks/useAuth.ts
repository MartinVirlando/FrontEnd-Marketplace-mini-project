import { useMutation, useQuery } from "@tanstack/react-query";
import { login, register, logout, getMe} from "../services/authService";
import { message } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../services/authService";

//Login
export const useLogin = () => {
    return useMutation({
        mutationFn: login,
        onSuccess: () => {
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
        onSuccess: () => {
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

//UpdateProfile
export const useUpdateProfile = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: updateProfile,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["me"] })
            message.success("Profile berhasil diupdate");
        },
        onError: (error: any) => {
            message.error(error.response?.data?.message || "Profile gagal diupdate");
        }
    })
}

export const useGetMe = () => {
    return useQuery({
        queryKey: ["me"],
        queryFn: getMe,
    })
}
