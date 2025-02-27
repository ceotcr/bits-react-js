import { Store } from './AxiosInstances'

export const callApi = async <T, S>({ url, method, data }: { url: string, method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', data?: T }): Promise<S> => {
    const response = await Store({
        url,
        method,
        data
    })
    if (response.status >= 400) {
        throw new Error(response.statusText)
    }
    return response.data
}