import { useQuery } from "@tanstack/react-query";
import { getCategories, getCategoryById } from "../services/categoryService";

//getCategory
export const useCategory = () => {
    return useQuery({
        queryKey: ["category"],
        queryFn: () => getCategories(),
    })
}

//getCategoryById
export const useCategoryById = (id: number) => {
    return useQuery({
        queryKey: ["category", id],
        queryFn: () => getCategoryById(id),
    })
}