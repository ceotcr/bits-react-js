import { createContext, useContext, ReactNode, useState, useEffect, useReducer, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { addProduct, updateProduct, deleteProduct, getProducts } from "../../lib/APICalls/products";
import { toast } from "sonner";
import { filterReducer } from "../../lib/reducers";
import { IProduct } from "../interfaces";

interface ProductContextType {
    products: IProduct[];
    loading: boolean;
    addNewProduct: (product: Partial<IProduct>) => void;
    updateExistingProduct: (product: Partial<IProduct>) => void;
    removeProduct: (id: number) => void;
    filters: {
        category: string;
        sort: 'asc' | 'desc' | "";
        limit: number;
    };
    changeCategory: (value: string) => void;
    changeSort: (value: 'asc' | 'desc') => void;
    changeLimit: (value: number) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
    const [localProducts, setLocalProducts] = useState<IProduct[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filters, dispatch] = useReducer(filterReducer, {
        category: 'all',
        sort: 'asc',
        limit: 0
    });

    useEffect(() => {
        setIsLoading(true);
        getProducts(filters).then((data) => {
            setLocalProducts(data);
        }).finally(() => {
            setIsLoading(false);
        });
    }, [filters]);

    const addProductMutation = useMutation({
        mutationFn: (product: Partial<IProduct>) => addProduct(product),
        onSuccess: (newProduct: IProduct) => {
            setLocalProducts((prev) => [...prev, newProduct]);
            toast.success("Product added successfully!");
        },
        onError: () => toast.error("Failed to add product.")
    });

    const updateProductMutation = useMutation({
        mutationFn: (product: Partial<IProduct>) => updateProduct(product),
        onSuccess: (updatedProduct: IProduct) => {
            setLocalProducts((prev) => prev.map((p) => p.id === updatedProduct.id ? updatedProduct : p));
            toast.success("Product updated successfully!");
        },
        onError: () => toast.error("Failed to update product.")
    });

    const deleteProductMutation = useMutation({
        mutationFn: (id: number) => deleteProduct(id),
        onSuccess: (_, id: number) => {
            setLocalProducts((prev) => prev.filter((p) => p.id !== id));
            toast.success("Product deleted successfully!");
        },
        onError: () => toast.error("Failed to delete product.")
    });

    const addNewProduct = (product: Partial<IProduct>) => addProductMutation.mutate(product);
    const updateExistingProduct = (product: Partial<IProduct>) => updateProductMutation.mutate(product);
    const removeProduct = (id: number) => deleteProductMutation.mutate(id);

    const changeCategory = useCallback((value: string) => {
        dispatch({ type: 'SET_CATEGORY', payload: value });
    }, []);

    const changeSort = useCallback((value: 'asc' | 'desc') => {
        dispatch({ type: 'SET_SORT', payload: value });
    }, []);

    const changeLimit = useCallback((value: number) => {
        dispatch({ type: 'SET_LIMIT', payload: value });
    }, []);

    return (
        <ProductContext.Provider
            value={{
                products: localProducts,
                loading: isLoading,
                addNewProduct,
                updateExistingProduct,
                removeProduct,
                filters,
                changeCategory,
                changeSort,
                changeLimit
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

export const useProduct = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error("useProduct must be used within a ProductProvider");
    }
    return context;
};
