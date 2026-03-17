import api from "./api";
import type { Category } from "../types";


//Get Categories
export const getCategories = async (): Promise<Category[]> => {
    const response = await api.get("/categories");
    return response.data;
}

//Get Category by id
export const getCategoryById = async (id: number): Promise<Category> => {
    const response = await api.get(`/categories/${id}`);
    return response.data;
}


