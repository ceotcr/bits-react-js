import { callApi } from "../Generics"
import { IProduct } from "../interfaces"

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