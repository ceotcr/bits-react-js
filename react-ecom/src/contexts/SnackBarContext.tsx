import { createContext, useContext, useState, useCallback } from "react";
import { Status } from "../libs/interfaces";

interface ISnackbarContext {
    showSnackbar: (message: string, status: Status) => void;
    isShowing: boolean;
    status: Status;
    message: string;
}

const SnackbarContext = createContext<ISnackbarContext | undefined>(undefined);

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isShowing, setIsShowing] = useState(false);
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<Status>(Status.SUCCESS);
    const showSnackbar = useCallback((msg: string, status: Status) => {
        setMessage(msg);
        setStatus(status);
        setIsShowing(true);
        setTimeout(() => setIsShowing(false), 3000); // Auto-hide after 3 seconds
    }, []);

    return (
        <SnackbarContext.Provider value={{ showSnackbar, isShowing, message, status }}>
            {children}
        </SnackbarContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSnackbar = () => {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error("useSnackbar must be used within a SnackbarProvider");
    }
    return context;
};
