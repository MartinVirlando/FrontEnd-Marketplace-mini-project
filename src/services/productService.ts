import api from "./api";
import type { ProductParams, ProductRequest, Product} from "../types";

//Read
export const  getProduct = async (params: ProductParams): Promise<Product[]> => {
    const response = await api.get("/products", {params});
    return response.data;
}

//Read
export const getProductById = async (id: number): Promise<Product> => {
    const response = await api.get(`/products/${id}`);
    return response.data;
}

//Create
export const createProduct = async (data: ProductRequest): Promise<Product> => {
    const response = await api.post("/products", data);
    return response.data;
}

//Update
export const updateProduct = async (id: number, data: ProductRequest): Promise<Product> => {
    const response = await api.put(`/products/${id}`, data);
    return response.data;
}

//Delete
export const deleteProduct = async (id: number): Promise<void> => {
    await api.delete(`/products/${id}`);
}

//Get By Seller
export const getProductBySeller = async (): Promise<Product[]> => {
    const response = await api.get("/seller/products");
    return response.data;
}

//Update Status
export const updateProductStatus = async (id: number, status: string): Promise<Product> => {
    const response = await api.put(`/products/${id}/status`, {status});
    return response.data;
}



