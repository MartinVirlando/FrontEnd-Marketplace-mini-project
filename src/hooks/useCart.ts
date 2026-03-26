import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { addToCart, clearCart, getCart, removeFromCart, updateCart } from "../services/cartService";

import { message } from "antd";

//getCart
export const useGetCart = () => {
    return useQuery({
        queryKey: ["cart"],
        queryFn: () => getCart(),
    })
}

//CreateCart
export const useCreateCart = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: addToCart,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cart"]
            })
            message.success("Product berhasil ditambahkan ke keranjang");
        },
        onError: (error: any) => {
            message.error(error.response?.data?.message || "Product gagal ditambahkan ke keranjang");
        },
    })
}

//UpdateCart
export const useUpdateCart = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({id, quantity}: {id: number, quantity: number}) => updateCart(id, quantity),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cart"]
            })
            message.success("Product berhasil diupdate");
        },
        onError: (error: any) => {
            message.error(error.response?.data?.message || "Product gagal diupdate");
        },
    })
}

//DeleteCart
export const useDeleteCart = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: removeFromCart,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cart"]
            })
            message.success("Product berhasil dihapus");
        },
        onError: (error: any) => {
            message.error(error.response?.data?.message || "Product gagal dihapus");
        }
    })
}

//ClearCart
export const useClearCart = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: clearCart,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cart"]
            })
            message.success("Keranjang berhasil dikosongkan");
        },
        onError: (error: any) => {
            message.error(error.response?.data?.message || "Keranjang gagal dikosongkan");
        }
    })
}