import { createUser, deleteUser, getUser, getUsers, updateUser } from "@/lib/APICalls/users";
import { IUsersStore } from "@/lib/interfaces";
import { create } from "zustand";

export const useUserStore = create<IUsersStore>((set) => ({
    users: [],
    addUser: async (user) => {
        const response = await createUser(user);
        if (response) {
            set((state) => ({ users: [...state.users, response] }));
        }
    },
    loadUsers: async () => {
        const users = await getUsers();
        if (users)
            set({ users });
    },
    getUser: async (id: number) => {
        const user = await getUser(id);
        if (!user) {
            throw new Error("Error Fetching User");
        }
        return user;
    },
    updateUser: async (user) => {
        const response = await updateUser(user);
        if (response) {
            set((state) => ({ users: state.users.map((u) => u.id === response.id ? response : u) }));
        }
    },
    deleteUser: async (id: number) => {
        const response = await deleteUser(id);
        if (response) {
            set((state) => ({ users: state.users.filter((u) => u.id !== response.id) }));
        }
    }
}));