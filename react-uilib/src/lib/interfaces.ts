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
export interface IFilterState {
    category: string;
    sort: 'asc' | 'desc' | '';
    limit: number;
}

export interface IFilterAction {
    type: 'SET_CATEGORY' | 'SET_SORT' | 'SET_LIMIT';
    payload: string | ('asc' | 'desc') | number;
}

export interface ICartItem {
    id: number;
    title: string;
    price: number;
    image: string;
    category: string;
    description: string;
    quantity: number;
}

export interface ICartStore {
    cart: ICartItem[];
    addToCart: (product: IProduct) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
    incQuantity: (id: number) => void;
    decQuantity: (id: number) => void;
}

export interface IOrder {
    id: number;
    userId: number;
    products: IOrderProduct[];
}

export interface IOrderStore {
    orders: IOrder[];
    addOrder: (items: ICartItem[], userId: number) => Promise<void>;
    deleteOrder: (id: number) => Promise<void>;
    clearOrders: () => void;
    getOrder: (id: number) => Promise<IOrder>;
    loadOrders: (userId: number) => Promise<void>;
}

export interface IOrderProduct {
    productId: number;
    quantity: number;
}