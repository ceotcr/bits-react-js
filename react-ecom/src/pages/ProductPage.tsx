import { useEffect, useState } from "react";
import { MdArrowBack } from "react-icons/md";
import RatingStars from "../Components/products/RatingStars";
import { Link, useNavigate, useParams } from "react-router";
import { IProduct } from "../libs/interfaces";
import NotFound from "./NotFound";
import Loading from "../Components/layout/Loading";
import { getProduct } from "../libs/APICalls/Products";

const ProductPage = () => {
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState<IProduct | null>(null);

    const params = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        if (!params.id) return;
        getProduct(Number(params.id))
            .then((response) => {
                setProduct(response)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
                setLoading(false)
            })
    }, [params.id])

    if (loading) {
        return (<Loading text="Loading Product..." />);
    }
    if (!product) {
        return (
            <NotFound isProduct />
        )
    }

    return (
        <section className="p-6 w-full">
            <div className="w-full mx-auto max-w-[1440px] flex flex-col items-center justify-center gap-4 min-h-[calc(100vh-160px)]">
                <button
                    className="p-4 bg-black text-white material-symbols-outlined mr-auto cursor-pointer"
                    onClick={() => navigate(-1)}
                >
                    <MdArrowBack size={24} />
                </button>

                <div
                    id="main-product-container"
                    className="grid grid-cols-1 md:grid-cols-2 justify-center gap-4 lg:gap-8"
                >
                    <img
                        id="image"
                        src={product.image}
                        className="w-full max-h-[512px] object-top object-cover rounded-md"
                        alt={product.title}
                    />

                    <div className="w-full flex flex-col gap-4">
                        <h2 className="lg:text-5xl md:text-3xl sm:text-4xl text-3xl font-semibold text-gray-900">
                            {product.title}
                        </h2>

                        <Link to={`/products/?category=${product.category}`} className="flex items-center gap-2">
                            {product.category}
                        </Link>

                        <div className="flex items-center gap-2">
                            <RatingStars rating={product.rating.rate} count={product.rating.count} />
                        </div>

                        <p className="text-lg font-medium text-gray-900">${product.price.toFixed(2)}</p>

                        <p className="text-gray-700">
                            <b>About this item:</b><br />
                            <span>{product.description}</span>
                        </p>

                        <div className="flex items-center gap-4">
                            <button className="px-4 py-2 bg-gray-900 text-white w-full cursor-pointer rounded-md">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductPage;
