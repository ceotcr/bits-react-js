import { callApi } from "../Generics"
import { IProduct } from "../interfaces"

export const getCategories = async () => {
    const response = await callApi<undefined, string[]>({
        url: '/products/categories',
        method: 'GET'
    })
    return response
}


export const getProducts = async ({ limit = 0, category = "" }) => {
    let url = '/products';
    if (category) {
        url += `?category=${category}`
    }
    if (limit) {
        url += `?limit=${limit}`
    }
    const response = await callApi<undefined, IProduct[]>({
        url,
        method: 'GET'
    })
    return response
}


export const getProduct = async (id: number) => {
    const response = await callApi<undefined, IProduct>({
        url: `/products/${id}`,
        method: 'GET'
    })
    return response
}


export const deleteProduct = async (id: number) => {
    const response = await callApi<undefined, IProduct>({
        url: `/products/${id}`,
        method: 'DELETE'
    })
    return response
}

export const addProduct = async (product: IProduct) => {
    const response = await callApi<IProduct, IProduct>({
        url: '/products',
        method: 'POST',
        data: product
    })
    return response
}

export const updateProduct = async (product: IProduct) => {
    const response = await callApi<IProduct, IProduct>({
        url: `/products/${product.id}`,
        method: 'PUT',
        data: product
    })
    return response
}