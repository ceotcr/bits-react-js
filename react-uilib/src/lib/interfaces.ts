export interface IProduct {
    id: number
    title: string
    price: number
    description: string
    category: string
    image: string
    rating: IRating
}

export interface IRating {
    rate: number
    count: number
}
export interface FilterState {
    category: string;
    sort: 'asc' | 'desc' | '';
    limit: number;
}

export interface FilterAction {
    type: 'SET_CATEGORY' | 'SET_SORT' | 'SET_LIMIT';
    payload: string | ('asc' | 'desc') | number;
}