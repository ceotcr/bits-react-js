/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useReducer, useCallback, useMemo } from "react";
import { ICartItem, IProduct, Status } from "../libs/interfaces";
import { useSnackbar } from "./SnackBarContext";

interface ICartContext {
    items: ICartItem[];
    quantity: number;
    getTotal: () => { subtotal: string; tax: string; total: string };
    add: (product: IProduct) => void;
    dec: (product: IProduct) => void;
    remove: (id: number) => void;
    checkout: () => void;
    clear: () => void;
}

type CartAction =
    | { type: "ADD"; product: IProduct }
    | { type: "DECREMENT"; product: IProduct }
    | { type: "REMOVE"; id: number }
    | { type: "CLEAR" }
    | { type: "CHECKOUT" };

const cartReducer = (state: ICartItem[], action: CartAction): ICartItem[] => {
    switch (action.type) {
        case "ADD":
            return state.some(item => item.id === action.product.id)
                ? state.map(item =>
                    item.id === action.product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
                : [...state, { ...action.product, quantity: 1 }];

        case "DECREMENT":
            return state.map(item =>
                item.id === action.product.id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            ).filter(item => item.quantity > 0);

        case "REMOVE":
            return state.filter(item => item.id !== action.id);

        case "CLEAR":
        case "CHECKOUT":
            return [];

        default:
            return state;
    }
};

const CartContext = createContext<ICartContext | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, dispatch] = useReducer(cartReducer, []);
    const { showSnackbar } = useSnackbar();
    const tax = 18;

    const quantity = useMemo(() => items.reduce((total, item) => total + item.quantity, 0), [items]);

    const getTotal = useCallback(() => {
        const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
        const taxAmount = (tax * subtotal) / 100;
        return {
            subtotal: subtotal.toFixed(2),
            tax: taxAmount.toFixed(2),
            total: (subtotal + taxAmount).toFixed(2),
        };
    }, [items, tax]);

    const add = useCallback((product: IProduct) => {
        dispatch({ type: "ADD", product });
        showSnackbar("Added to cart", Status.SUCCESS);
    }, []);

    const dec = useCallback((product: IProduct) => {
        dispatch({ type: "DECREMENT", product });
        showSnackbar("Removed from cart", Status.ERROR);
    }, []);

    const remove = useCallback((id: number) => {
        dispatch({ type: "REMOVE", id });
        showSnackbar("Removed from cart", Status.ERROR);
    }, []);

    const checkout = useCallback(() => {
        dispatch({ type: "CHECKOUT" });
        showSnackbar("Order Placed", Status.SUCCESS);
    }, []);

    const clear = useCallback(() => {
        dispatch({ type: "CLEAR" });
        showSnackbar("Cart cleared", Status.ERROR);
    }, []);

    return (
        <CartContext.Provider value={{ items, quantity, getTotal, add, dec, remove, checkout, clear }}>
            {children}
        </CartContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
