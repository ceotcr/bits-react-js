import { createContext, useContext, useReducer } from "react";
import { toast } from "sonner";
import { authLogin } from "../APICalls/auth";

interface UserState {
    id: string | null;
    token: string | null;
}

interface AuthContextType {
    user: UserState;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const initialState: UserState = { id: null, token: null };

const authReducer = (state: UserState, action: { type: string; payload?: UserState }) => {
    switch (action.type) {
        case "LOGIN":
            return action.payload || state;
        case "LOGOUT":
            return { id: null, token: null };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const isAuthenticated = !!state.token;

    const login = async (username: string, password: string) => {
        try {
            const newUser = await authLogin(username, password);

            if (!newUser) {
                return false;
            }

            dispatch({ type: "LOGIN", payload: newUser });
            toast.success("Logged in successfully");

            return true;
        } catch (error) {
            toast.error("Error logging in - " + (error as Error).message);
            return false;
        }
    };

    const logout = () => {
        dispatch({ type: "LOGOUT" });
        toast.success("Logged out successfully");
    };

    return (
        <AuthContext.Provider value={{ user: state, login, logout, isAuthenticated }}>
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
