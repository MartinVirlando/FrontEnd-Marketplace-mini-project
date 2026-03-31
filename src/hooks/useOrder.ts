import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { getOrders, getOrderById, createOrder, cancelOrder } from "../services/orderService";
import { message } from "antd";

//GetOrder
export const useGetOrders = () => {
    return useQuery({
        queryKey: ["order"],
        queryFn: () => getOrders(),
    })
}

//GetOrderById
export const useGetOrderById = (id: number) => {
    return useQuery({
        queryKey: ["order", id],
        queryFn: () => getOrderById(id),
    })
}

//CreateOrder
export const useCreateOrder = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createOrder,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["order"]
            })
            message.success("Order berhasil dibuat");
        },
        onError: (error: any) => {
            message.error(error.response?.data?.message || "Order gagal dibuat");
        },
    })
}

//CancelOrder
export const useCancelOrder = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: cancelOrder,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["order"]
            })
            message.success("Order berhasil dibatalkan");
        },
        onError: (error: any) => {
            message.error(error.response?.data?.message || "Order gagal dibatalkan");
        }
    })
}