import api from "./api";
import type { Notification } from "../types";


//Get notif
export const getNotifications = async (): Promise<Notification[]> => {
    const response = await api.get("/notifications");
    return response.data;
}

//Mark as read
export const markAsRead = async (id: number): Promise<void> => {
    await api.put(`/notifications/${id}/read`);
}

//mark all as read

export const markAllAsRead = async (): Promise<void> => {
    await api.put("/notifications/read-all");
}