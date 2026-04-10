import api from "./api";

import type { OrderRequest, PaymentResponse, Order } from "../types";

//Get Order
export const getOrders = async (): Promise<Order[]> => {
    const response = await api.get("/orders");
    return response.data;
}

//Get Order By Id
export const getOrderById = async (id: number): Promise<Order> => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
}

//Create Order
export const createOrder = async (data: OrderRequest): Promise<PaymentResponse> => {
    const response = await api.post("/orders", data);
    return response.data;
}

// Cancel order
export const cancelOrder = async (id: number): Promise<Order> => {
    const response = await api.delete(`/orders/${id}`);
    return response.data;
}


