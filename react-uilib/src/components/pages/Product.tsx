import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";
import { getProduct } from "../../lib/APICalls/products";
import { Pen, Star, Trash } from "lucide-react";
import { Button } from "../ui/button";

const Product = () => {
    const { id } = useParams<{ id: string }>();
    const { data: product, isLoading: loading, error } = useQuery({
        queryKey: ['product', id],
        queryFn: () => getProduct(Number(id)),
        refetchOnWindowFocus: false,
        retry: 1
    })

    return (
        <div className="mt-4">
            {loading ? (
                <div>Loading...</div>
            ) :
                error ? (
                    <div>Error: {error.message}</div>
                ) :
                    product && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <img src={product.image} alt={product.title} className="w-full rounded-lg object-cover object-top max-h-[512px]" />
                            </div>
                            <div className="flex flex-col justify-center gap-4">
                                <h1 className="text-4xl font-bold">{product.title}</h1>
                                <h2 className="text-2xl font-bold">{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</h2>
                                <p className="text-lg flex gap-4"><Star fill="yellow" size={24} /> {product.rating.rate} ({product.rating.count})</p>
                                <p className="text-lg">{product.description}</p>
                                <p className="text-lg font-bold">${product.price}</p>
                                <div className="flex gap-4">
                                    <Link to={`/products/${product.id}/edit`} className="bg-blue-500 hover:bg-blue-600 cursor-pointer w-12 h-12 flex rounded-lg items-center justify-center">
                                        <Pen size={24} fill="white" stroke="transparent" />
                                    </Link>

                                    <Button className="bg-red-500 hover:bg-red-600 cursor-pointer w-12 h-12">
                                        <Trash size={24} fill="white" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
        </div>
    )
}

export default Product