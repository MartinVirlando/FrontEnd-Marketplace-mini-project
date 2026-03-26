import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { getReviewByProduct, createReview, deleteReview} from "../services/reviewService";
import { message } from "antd";
import type { ReviewRequest } from "../types";

//GetReview
export const useGetReview = (productId: number) => {
    return useQuery({
        queryKey: ["review", productId],
        queryFn: () => getReviewByProduct(productId),
    })
}

//CreateReview
export const useCreateReview = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({productId, data}: {productId: number, data: ReviewRequest}) => createReview(productId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["review"]
            })
            message.success("Review berhasil dibuat");
        },
        onError: (error: any) => {
            message.error(error.response?.data?.message || "Review gagal dibuat");
        },
    })
}

//DeleteReview
export const useDeleteReview = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: deleteReview,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["review"]
            })
            message.success("Review berhasil dihapus");

        },
        onError: (error: any) => {
            message.error(error.response?.data?.message || "Review gagal dihapus");
        }
    })
}