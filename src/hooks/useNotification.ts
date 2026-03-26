import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { message } from "antd";
import { getNotifications, markAllAsRead, markAsRead } from "../services/notificationService";

//GetNotif
export const useGetNotif = () => {
    return useQuery({
        queryKey: ["notif"],
        queryFn: () => getNotifications(),
    })
}

//MarkAsRead
export const useMarkAsRead = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: markAsRead,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["notif"]
            })
            message.success("Notifikasi berhasil dibaca");
        },
        onError: (error: any) => {
            message.error(error.response?.data?.message || "Notifikasi gagal dibaca");
        }
    })
}

//MarkAllAsRead
export const useMarkAllAsRead = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: markAllAsRead,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["notif"]
            })
            message.success("Semua notifikasi telah dibaca");
        },
        onError: (error: any) => {
            message.error(error.response?.data?.message || "Semua notifikasi gagal dibaca");
        }
    })
}