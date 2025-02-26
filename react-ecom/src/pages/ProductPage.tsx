import { MdArrowBack } from "react-icons/md";
import RatingStars from "../Components/products/RatingStars";
import { Link, useNavigate, useParams } from "react-router";
import NotFound from "./NotFound";
import Loading from "../Components/layout/Loading";
import { getProduct } from "../libs/APICalls/Products";
import { useCart } from "../contexts/CartContext";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext";

const ProductPage = () => {
    const { add } = useCart()
    const { id } = useParams()
    const navigate = useNavigate()
    if (!id) {
        navigate('/404')
    }
    const { isAuthenticated } = useAuth()
    const { data: product, isLoading: loading } = useQuery({
        queryKey: ['product', id],
        queryFn: () => getProduct(Number(id)),
        refetchOnWindowFocus: false,
        retry: 1
    })
    if (loading) {
        return (
            <section className="p-6 w-full">
                <div className="w-full mx-auto max-w-[1440px] flex flex-col items-center justify-center gap-4 min-h-[calc(100vh-160px)]">
                    <Loading text="Loading Product..." />
                </div>
            </section>);
    }
    else if (!product) {
        return (
            <section className="p-6 w-full">
                <div className="w-full mx-auto max-w-[1440px] flex flex-col items-center justify-center gap-4 min-h-[calc(100vh-160px)]">
                    <NotFound isProduct /></div>
            </section>
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
                    className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-4 lg:gap-8"
                >
                    <img
                        src={product.image}
                        className="w-full max-h-[512px] object-top object-cover rounded-md"
                        alt={product.title}
                    />

                    <div className="w-full flex flex-col gap-4">
                        <h2 className="lg:text-5xl md:text-3xl sm:text-4xl text-3xl font-semibold text-gray-900">
                            {product.title}
                        </h2>

                        <Link to={`/products/?category=${product.category}`} className="flex items-center gap-2">
                            Category: {
                                product.category.charAt(0).toUpperCase() + product.category.slice(1)
                            }
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
                            <button className="px-4 py-2 bg-gray-900 text-white w-full cursor-pointer rounded-md" onClick={() => {
                                if (!isAuthenticated) {
                                    navigate('/login')
                                }
                                add(product)
                            }}>
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
