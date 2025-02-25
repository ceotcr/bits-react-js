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


export const deleteProduct = async (id: number) => {
    const response = await callApi<undefined, IProduct>({
        url: `/products/${id}`,
        method: 'DELETE'
    })
    if (!response) {
        throw new Error("Error Deleting Product")
    }
    return response
}

export const addProduct = async (product: IProduct) => {
    const response = await callApi<IProduct, IProduct>({
        url: '/products',
        method: 'POST',
        data: product
    })
    if (!response) {
        throw new Error("Error Adding Product")
    }
    return response
}

export const updateProduct = async (product: IProduct) => {
    const response = await callApi<IProduct, IProduct>({
        url: `/products/${product.id}`,
        method: 'PUT',
        data: product
    })
    if (!response) {
        throw new Error("Error Updating Product")
    }
    return response
}