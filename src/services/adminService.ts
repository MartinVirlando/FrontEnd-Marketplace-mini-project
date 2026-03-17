import api from "./api";
import type{ DashboardStats, Product, User } from "../types";

//get DashBoard status
export const getDashboardStats = async (): Promise<DashboardStats> => {
    const response = await api.get("/admin/dashboard");
    return response.data;
}

//get produk pending
export const getPendingProducts = async (): Promise<Product[]> => {
    const response = await api.get("/admin/products/pending");
    return response.data;
}

//Approve Produk
export const approveProduct = async (id: number): Promise<Product> => {
    const response = await api.put(`/admin/products/${id}/approve`);
    return response.data;
}

//Reject Produk
export const rejectProduct = async (id: number): Promise<Product> => {
    const response = await api.put(`/admin/products/${id}/reject`);
    return response.data;
}

//Get User
export const getUsers = async (): Promise<User[]> => {
    const response = await api.get("/admin/users");
    return response.data;
}

//Delete User
export const deleteUser = async (id: number): Promise<void> => {
    await api.delete(`/admin/users/${id}`);
}