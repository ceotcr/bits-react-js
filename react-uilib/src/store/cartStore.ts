import { ICartStore } from "@/lib/interfaces";
import { toast } from "sonner";
import { create } from "zustand";

export const useCartStore = create<ICartStore>((set) => ({
    cart: [],
    removeFromCart: (id) => {
        set((state) => ({
            cart: state.cart.filter((item) => item.id !== id),
        }))
        toast.success("Product removed from cart")
    },
    addToCart: (product) => {
        set((state) => {
            const existingItem = state.cart.find((item) => item.id === product.id)
            if (existingItem) {
                return {
                    cart: state.cart.map((item) =>
                        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                    ),
                }
            }
            return { cart: [...state.cart, { ...product, quantity: 1 }] }
        })
    },
    incQuantity: (id) => {
        set((state) => ({
            cart: state.cart.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            ),
        }))
        toast.success("Product quantity increased")
    },
    decQuantity: (id) => {
        set((state) => ({
            cart: state.cart.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            ).filter((item) => item.quantity > 0),
        }))
        toast.success("Product quantity decreased")
    },
    clearCart: () => set({ cart: [] }),
}));