import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { message } from "antd";
import { approveProduct, approveAllProducts, deleteUser, getDashboardStats, getPendingProducts, getUsers, rejectProduct } from "../services/adminService";

//getDashBoard
export const useGetDashboard = () => {
    return useQuery({
        queryKey: ["dashboard"],
        queryFn: () => getDashboardStats(),
    })
}

//getPendingProduct
export const useGetPendingProduct = () => {
    return useQuery({
        queryKey: ["pendingProduct"],
        queryFn: () => getPendingProducts(),
    })
}

//ApproveProduct
export const useApproveProduct = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: approveProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["pendingProduct"]
            })
            message.success("Product berhasil disetujui");
        },
        onError: (error: any) => {
            message.error(error.response?.data?.message || "Product gagal disetujui");
        }
    })
}

//ApproveAllProduct
export const useApproveAllProducts = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: approveAllProducts,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["pendingProduct"] })
            message.success("Semua produk berhasil disetujui");
        },
        onError: (error: any) => {
            message.error(error.response?.data?.message || "Gagal menyetujui semua produk");
        }
    })
}

//RejectProduct
export const useRejectProduct = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: rejectProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["pendingProduct"]
            })
            message.success("Product berhasil ditolak");
        },
        onError: (error: any) => {
            message.error(error.response?.data?.message || "Product gagal ditolak");
        }
    })
}

//getUser
export const useGetUser = () => {
    return useQuery({
        queryKey: ["user"],
        queryFn: () => getUsers(),
    })
}

//DeleteUser
export const useDeleteUser = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["user"]
            })
            message.success("User berhasil dihapus");
        },
        onError: (error: any) => {
            message.error(error.response?.data?.message || "User gagal dihapus");
        }
    })
}