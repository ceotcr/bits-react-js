import { create } from "zustand";
import { toast } from "sonner";
import { authLogin } from "../lib/APICalls/auth";

interface IUserState {
    id: number | null;
    token: string | null;
    user: string | null;
}

interface IAuthStore {
    user: IUserState;
    isAuthenticated: boolean;
    login: (username: string, password: string, getOrders: (id: number) => void) => Promise<boolean>;
    logout: () => void;
}

export const useAuthStore = create<IAuthStore>((set) => ({
    user: { id: null, token: null, user: null },
    isAuthenticated: false,

    login: async (username, password, getOrders) => {
        try {
            if (!username || !password) {
                toast.error("Username and password are required");
                return false;
            }
            const newUser = await authLogin(username, password);
            if (!newUser) return false;

            set({ user: newUser, isAuthenticated: true });
            toast.success("Logged in successfully");
            getOrders(newUser.id);
            return true;
        } catch (error) {
            toast.error("Error logging in - " + (error as Error).message);
            return false;
        }
    },

    logout: () => {
        set({ user: { id: null, token: null, user: null }, isAuthenticated: false });
        toast.success("Logged out successfully");
    }
}));
