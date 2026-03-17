import api from "./api";
import type {ReviewRequest, Review} from "../types";

//get Review by product
export const getReviewByProduct = async (productId: number): Promise<Review[]> => {
    const response = await api.get(`/products/${productId}/reviews`);
    return response.data;
}

//create Review
export const createReview = async (productId: number, data: ReviewRequest): Promise<Review> => {
    const response = await api.post(`/products/${productId}/reviews`, data);
    return response.data;
}

//Delete Review
export const deleteReview = async (id: number): Promise<void> => {
    await api.delete(`/reviews/${id}`);
}
