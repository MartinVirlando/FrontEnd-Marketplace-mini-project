import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { getConversations, getMessages, markAsRead, sendMessage } from "../services/chatService";
import { message } from "antd";

//GetConversation
export const useGetConversation = () => {
    return useQuery({
        queryKey: ["conversation"],
        queryFn: () => getConversations(),
    })
}

//GetMessage
export const useGetMessage = (userId: number) => {
    return useQuery({
        queryKey: ["message", userId],
        queryFn: () => getMessages(userId),
    })
}

//SendMessage
export const useSendMessage = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: sendMessage,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["message"]
            })
        },
        onError: (error: any) => {
            message.error(error.response?.data?.message || "Message gagal dikirim");
        }
    })
}

//MarkAsRead
export const useMarkAsRead = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: markAsRead,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["message"]
            })
        },
        onError: (error: any) => {
            message.error(error.response?.data?.message || "Message gagal dibaca");
        }
    })
}