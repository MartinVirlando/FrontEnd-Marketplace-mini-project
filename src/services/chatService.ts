import api from "./api";
import type { Message, MessageRequest } from "../types";

//Get Messages
export const getConversations = async (): Promise<Message[]> => {
    const response = await api.get("/messages");
    return response.data;
}

//Get Messages by user ID
export const getMessages = async (userId: number): Promise<Message[]> => {
    const response = await api.get(`/messages/${userId}`);
    return response.data;
}

//Send Message
export const sendMessage = async (data: MessageRequest): Promise<Message> => {
    const response = await api.post("/messages", data);
    return response.data;
}

//Mark As Read
export const markAsRead = async (userId: number): Promise<void> => {
    await api.put(`/messages/${userId}/read`);
}