import { toast } from "sonner";
import { callApi } from "../Generics";
import { ICartItem, IOrder, IOrderProduct } from "../interfaces";

export const createOrder = async (cart: ICartItem[], userId: number) => {
    const products = cart.map((product) => ({
        productId: product.id,
        quantity: product.quantity
    })) as IOrderProduct[]
    const response = await callApi<
        { products: IOrderProduct[], userId: number, id: 0 },
        IOrder
    >({
        url: '/carts',
        method: 'POST',
        data: { products, userId, id: 0 }
    })
    if (!response) {
        toast.error("Error Creating Order")
        throw new Error("Error Creating Order")
    }
    return response
}

export const getOrders = async (userId: number) => {
    const response = await callApi<undefined, IOrder[]>({
        url: `/carts/user/${userId}`,
        method: 'GET'
    })
    if (!response) {
        toast.error("Error Fetching Orders")
        throw new Error("Error Fetching Orders")
    }
    return response
}

export const getOrder = async (id: number) => {
    const response = await callApi<undefined, IOrder>({
        url: `/carts/${id}`,
        method: 'GET'
    })
    if (!response) {
        toast.error("Error Fetching Order")
        throw new Error("Error Fetching Order")
    }

    return response
}

export const deleteOrder = async (id: number) => {
    const response = await callApi<undefined, IOrder>({
        url: `/carts/${id}`,
        method: 'DELETE'
    })
    if (!response) {
        toast.error("Error Deleting Order")
        throw new Error("Error Deleting Order")
    }
    return response
}
