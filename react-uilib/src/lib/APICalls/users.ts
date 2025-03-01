import { toast } from "sonner";
import { callApi } from "../Generics";
import { User } from "../schema/usersSchema";

export const createUser = async (user: User) => {
    const response = await callApi<User, User>({
        url: '/users',
        method: 'POST',
        data: user
    })
    if (!response) {
        toast.error("Error Creating User")
        throw new Error("Error Creating User")
    }
    return response
}

export const getUsers = async () => {
    const response = await callApi<undefined, User[]>({
        url: '/users',
        method: 'GET'
    })
    if (!response) {
        toast.error("Error Fetching Users")
        throw new Error("Error Fetching Users")
    }
    return response
}

export const getUser = async (id: number) => {
    const response = await callApi<undefined, User>({
        url: `/users/${id}`,
        method: 'GET'
    })
    if (!response) {
        toast.error("Error Fetching User")
        throw new Error("Error Fetching User")
    }

    return response
}

export const deleteUser = async (id: number) => {
    const response = await callApi<undefined, User>({
        url: `/users/${id}`,
        method: 'DELETE'
    })
    if (!response) {
        toast.error("Error Deleting User")
        throw new Error("Error Deleting User")
    }
    return response
}

export const updateUser = async (user: User) => {
    const response = await callApi<User, User>({
        url: `/users/${user.id}`,
        method: 'PUT',
        data: user
    })
    if (!response) {
        toast.error("Error Updating User")
        throw new Error("Error Updating User")
    }
    return response
}
