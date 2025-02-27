import { createOrder, deleteOrder, getOrder, getOrders } from "@/lib/APICalls/orders";
import { IOrderStore } from "@/lib/interfaces";
import { toast } from "sonner";
import { create } from "zustand";

export const useOrderStore = create<IOrderStore>((set) => ({
    orders: [],
    clearOrders: () => set({ orders: [] }),
    getOrder: async (id: number) => {
        const order = await getOrder(id);
        return order;
    },
    loadOrders: async (userId: number) => {
        const orders = await getOrders(userId);
        set({ orders });
    },
    addOrder: async (items, userId) => {
        const response = await createOrder(items, userId);
        set((state) => ({ orders: [...state.orders, response] }));
        toast.success("Order Created Successfully");
    },
    deleteOrder: async (id: number) => {
        const response = await deleteOrder(id);
        set((state) => ({ orders: state.orders.filter((order) => order.id !== response.id) }));
        toast.success("Order Deleted Successfully");
    }
}));