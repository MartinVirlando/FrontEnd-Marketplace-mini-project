import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import type { ProductParams, ProductRequest } from "../types";
import { createProduct, deleteProduct, uploadImage, getProduct, getProductById, updateProduct, getProductBySeller, updateProductStatus } from "../services/productService";
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
            queryClient.invalidateQueries({ queryKey: ["products"] })
            queryClient.invalidateQueries({ queryKey: ["sellerProducts"] }) // tambah ini
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

//GetBySeller
export const useGetProductBySeller = () => {
    return useQuery({
        queryKey: ["sellerProducts"],
        queryFn: () => getProductBySeller(),
    })
}

//UpdateStatus
export const useUpdateProductStatus = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({id, status}: {id: number, status: string}) => updateProductStatus(id, status),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["sellerProducts"]
            })
            message.success("Status produk berhasil diupdate");
        },
        onError: (error: any) => {
            message.error(error.response?.data?.message || "Status produk gagal diupdate");
        }
    })
}

//Upload Image
export const useUploadImage = () => {
    return useMutation({
        mutationFn: uploadImage,
        onError: () => {
            message.error("Gagal upload gambar");
        },
    });
};