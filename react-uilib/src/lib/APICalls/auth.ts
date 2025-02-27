import { toast } from "sonner";
import { callApi } from "../Generics";

export const authLogin = async (username: string, password: string) => {
    try {
        const { token } = await callApi<{ username: string, password: string }, { token: string }>({
            url: '/auth/login',
            method: 'POST',
            data: { username, password }
        })

        if (!token) {
            toast.error("Invalid username or password");
            throw new Error("Invalid username or password");
        }
        const { sub: id, user }: { sub: number, user: string } = decodeToken(token);
        return { id, user, token };
    } catch (error) {
        toast.error("Error logging in - " + (error as Error).message);
        throw error;
    }
}


const decodeToken = (token: string) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(base64));
};

