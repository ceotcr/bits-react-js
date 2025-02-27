import axios from 'axios'

export const Store = axios.create({
    baseURL: 'https://fakestoreapi.com',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    },
    validateStatus: (status) => status >= 200 && status < 300,
})