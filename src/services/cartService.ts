import api from "./api";
import type { CartRequest, CartItem } from "../types";

//Get Cart
export const getCart = async (): Promise<CartItem[]> => {
    const response = await api.get("/cart");
    return response.data;
}

// Add to cart
export const addToCart = async (data: CartRequest): Promise<CartItem> => {
    const response = await api.post("/cart", data);
    return response.data;
}

//Update Cart
export const updateCart = async (id: number, quantity: number): Promise<CartItem> => {
    const response = await api.put(`/cart/${id}`, {quantity});
    return response.data;
}

//Delete Cart
export const removeFromCart = async (id: number): Promise<void> => {
    await api.delete(`/cart/${id}`);
}

//Clear Cart
export const clearCart = async (): Promise<void> => {
    await api.delete("/cart");
}
