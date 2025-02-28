import { useState } from "react";
import { useProduct } from "../../lib/contexts/ProductsContext.tsx";
import { Link, useNavigate, useParams } from "react-router";
import { Pen, ShoppingBag, Star, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../../lib/APICalls/products.ts";
import ConfirmDeleteDialog from "../custom/products/ConfirmDeleteDialog";
import { useCartStore } from "@/store/cartStore.ts";

const Product = () => {
    const { id } = useParams<{ id: string }>();
    const { removeProduct } = useProduct();
    const { addToCart } = useCartStore();
    const navigate = useNavigate();

    const { data: product, isLoading: loading, error } = useQuery({
        queryKey: ['product', id],
        queryFn: () => getProduct(Number(id)),
        refetchOnWindowFocus: false,
        retry: 1
    });

    const [confirmDelete, setConfirmDelete] = useState(false);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!product) return <p>Product not found</p>;

    return (
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full rounded-lg object-cover object-top max-h-[512px]"
                />
            </div>
            <div className="flex flex-col justify-center gap-4">
                <h1 className="text-4xl font-bold">{product.title}</h1>
                <h2 className="text-2xl font-bold">{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</h2>
                <p className="text-lg flex gap-4"><Star fill="yellow" size={24} /> {product.rating.rate} ({product.rating.count})</p>
                <p className="text-lg">{product.description}</p>
                <p className="text-lg font-bold">${product.price}</p>
                <div className="flex gap-4 items-end">
                    <Link to={`/products/${product.id}/edit`} className="bg-blue-500 hover:bg-blue-600 cursor-pointer w-12 h-12 flex rounded-lg items-center justify-center">
                        <Pen size={24} fill="white" stroke="transparent" />
                    </Link>
                    <Button
                        className="bg-red-500 hover:bg-red-600 cursor-pointer w-12 h-12"
                        onClick={() => setConfirmDelete(true)}
                    >
                        <Trash size={24} fill="white" />
                    </Button>
                    <Button
                        className="bg-blue-500 hover:bg-blue-600 w-12 h-12 cursor-pointer"
                        onClick={() => addToCart(product)}
                    >
                        <ShoppingBag size={24} />
                    </Button>
                </div>
            </div>

            <ConfirmDeleteDialog
                open={confirmDelete}
                onClose={() => setConfirmDelete(false)}
                onConfirm={() => {
                    removeProduct(product.id);
                    navigate("/products");
                }}
            />
        </div>
    );
};

export default Product;
