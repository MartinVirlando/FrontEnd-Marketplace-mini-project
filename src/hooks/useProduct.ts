import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import type { ProductParams, ProductRequest } from "../types";
import { createProduct, deleteProduct, getProduct, getProductById, updateProduct } from "../services/productService";
import { message } from "antd";


//GetProduct
export const useGetProducts = (params?: ProductParams) => {
    return useQuery({
        queryKey: ["products", params],
        queryFn: () => getProduct(params ?? {}),
    })
}

//GetById
export const useGetProductById = (id: number) => {
    return useQuery({
        queryKey: ["product", id],
        queryFn: () => getProductById(id),
    })
}

//CreateProduct
export const useCreateProduct = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createProduct,
        onSuccess: () => { 
            queryClient.invalidateQueries({
                queryKey: ["products"]
            }) 
            message.success("Product berhasil dibuat");
        },
        onError: (error: any) => {
            message.error(error.response?.data?.message || "Product gagal dibuat");
        },
    })
}

//UpdateProduct
export const useUpdateProduct = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({id, data}: {id: number, data: ProductRequest}) => updateProduct(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["products"]
            })
            message.success("Product berhasil diupdate");
        },
        onError: (error: any) => {
            message.error(error.response?.data?.message || "Product gagal diupdate");
        }
    })
}

//Delete Product
export const useDeleteProduct = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["products"]
            })
            message.success("Product berhasil dihapus");
        
        },
        onError: (error: any) => {
            message.error(error.response?.data?.message || "Product gagal Dihapus");
        }
    })
}