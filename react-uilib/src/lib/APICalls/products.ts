import { toast } from "sonner"
import { callApi } from "../Generics"
import { IProduct } from "../interfaces"

export const getCategories = async () => {
    const response = await callApi<undefined, string[]>({
        url: '/products/categories',
        method: 'GET'
    })
    if (!response) {
        toast.error("Error Fetching Categories")
        throw new Error("Error Fetching Categories")
    }
    return response
}


export const getProducts = async ({ limit = 0, category = "", sort = "asc" }) => {
    let url = '/products';
    if (category && category !== 'all') {
        url += `/category/${category}`
    }
    if (sort) {
        url += `?sort=${sort}`
    }
    if (limit) {
        url += `&limit=${limit}`
    }
    const response = await callApi<undefined, IProduct[]>({
        url,
        method: 'GET'
    })
    if (!response) {
        toast.error("Error Fetching Products")
        throw new Error("Error Fetching Products")
    }
    return response
}


export const getProduct = async (id: number) => {
    const response = await callApi<undefined, IProduct>({
        url: `/products/${id}`,
        method: 'GET'
    })
    if (!response) {
        toast.error("Product Not Found")
        throw new Error("Product Not Found")
    }
    return response
}


export const addProduct = async (product: Partial<IProduct>) => {
    const response = await callApi<Partial<IProduct>, IProduct>({
        url: '/products',
        method: 'POST',
        data: product
    })
    if (!response) {
        toast.error("Error Adding Product")
        throw new Error("Error Adding Product")
    }
    return response
}

export const updateProduct = async (product: Partial<IProduct>) => {
    const response = await callApi<Partial<IProduct>, IProduct>({
        url: `/products/${product.id}`,
        method: 'PUT',
        data: product
    })
    if (!response) {
        toast.error("Error Updating Product")
        throw new Error("Error Updating Product")
    }
    return response
}

export const deleteProduct = async (id: number) => {
    const response = await callApi<undefined, undefined>({
        url: `/products/${id}`,
        method: 'DELETE'
    })
    if (!response) {
        toast.error("Error Deleting Product")
        throw new Error("Error Deleting Product")
    }
    return response
}