import { callApi } from "../Generics"
import { IProduct } from "../interfaces"

export const getCategories = async () => {
    const response = await callApi<undefined, string[]>({
        url: '/products/categories',
        method: 'GET'
    })
    if (!response) {
        throw new Error("Error Fetching Categories")
    }
    return response
}


export const getProducts = async ({ limit = 0, category = "" }) => {
    let url = '/products';
    if (category) {
        url += `/category/${category}`
    }
    if (limit) {
        url += `?limit=${limit}`
    }
    const response = await callApi<undefined, IProduct[]>({
        url,
        method: 'GET'
    })
    if (!response) {
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
        throw new Error("Product Not Found")
    }
    return response
}