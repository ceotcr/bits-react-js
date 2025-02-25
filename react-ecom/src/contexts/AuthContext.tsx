import { createContext, useContext, useState } from "react";
import { useSnackbar } from "./SnackBarContext";

interface AuthContextType {
    user: { id: string | null; token: string | null };
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<{ id: string | null; token: string | null }>(
        () => {
            const storedUser = localStorage.getItem("user");
            return storedUser ? JSON.parse(storedUser) : { id: null, token: null };
        }
    );
    const { showSnackbar } = useSnackbar();
    const isAuthenticated = !!user.token;

    const login = async (username: string, password: string) => {
        try {
            const response = await fetch("https://fakestoreapi.com/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            if (!response.ok) {
                showSnackbar(data.message, 2);
                return false;
            }

            const decoded = decodeToken(data.token);
            const newUser = { id: decoded.sub, token: data.token };

            setUser(newUser);
            localStorage.setItem("user", JSON.stringify(newUser));
            showSnackbar("Login successful", 0);

            return true;
        } catch (error) {
            showSnackbar("Invalid username or password " + error, 2);
            return false;
        }
    };

    const logout = () => {
        setUser({ id: null, token: null });
        localStorage.removeItem("user");
        showSnackbar("Logged out successfully", 0);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};

const decodeToken = (token: string) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(base64));
};
