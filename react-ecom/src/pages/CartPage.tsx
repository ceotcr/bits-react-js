import { Link } from "react-router";
import { useCart } from "../contexts/CartContext";
import { ICartItem } from "../libs/interfaces";
import { FaMinus, FaPlus } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { useState } from "react";
import { useSnackbar } from "../contexts/SnackBarContext";

const Cart = () => {
    const { items, getTotal, add, dec, remove, checkout } = useCart();
    const [processing, setProcessing] = useState(false);
    const totals = getTotal();
    const isEmpty = items.length === 0;
    const { showSnackbar } = useSnackbar();
    const handleRemove = (id: number) => remove(id);
    const handleIncrease = (product: ICartItem) => add(product);
    const handleDecrease = (product: ICartItem) => dec(product);
    const handleCheckout = () => {
        if (items.length === 0) {
            alert("Please add products to cart");
            return;
        }
        setProcessing(true);
        setTimeout(() => {
            checkout();
            showSnackbar("Checkout successful", 0);
            setProcessing(false);
        }, 2000);
    };

    return (
        <section className="p-6 w-full">
            <div className="w-full mx-auto max-w-[1440px] items-center gap-4 min-h-screen h-fit flex flex-col">
                <h2 className="text-2xl font-semibold text-gray-900 mr-auto">Cart</h2>
                <div className="grid md:grid-cols-12 grid-cols-1 w-full gap-4">

                    {/* Cart Items */}
                    <div className="grid bg-white p-4 py-8 grid-cols-1 gap-8 w-full h-fit md:col-span-7">
                        {isEmpty ? (
                            <div className="col-span-full gap-4 flex flex-col items-center justify-center pt-20">
                                <p className="text-2xl text-gray-500">Your cart is empty</p>
                                <Link to="/products" className="text-xl text-center text-white bg-black p-4">Continue Shopping</Link>
                            </div>
                        ) : (
                            items.map((product) => (
                                <div key={product.id} className="flex gap-4 w-full">
                                    <img src={product.image} alt={product.title} className="w-28 aspect-square object-cover rounded-md max-h-28" />
                                    <div className="w-full flex flex-col">
                                        <a href={`/product/?id=${product.id}`} className="text-xl font-semibold text-gray-900">{product.title}</a>
                                        <a href={`/products/?category=${product.category}`} className="text-lg font-medium text-gray-500">{product.category}</a>
                                        <div className="flex items-center gap-4 mt-2">
                                            <button onClick={() => handleDecrease(product)} className="text-white text-xl flex items-center justify-center bg-black opacity-80 cursor-pointer hover:opacity-100 p-3">
                                                <FaMinus size={16} />
                                            </button>
                                            <span className="text-lg font-semibold text-gray-900">{product.quantity}</span>
                                            <button onClick={() => handleIncrease(product)} className="text-white text-xl flex items-center justify-center bg-black opacity-80 cursor-pointer hover:opacity-100 p-3">
                                                <FaPlus size={16} />
                                            </button>
                                            <button onClick={() => handleRemove(product.id)} className="text-white text-xl p-3 bg-black opacity-80 cursor-pointer hover:opacity-100"><MdClose size={16} /> </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Cart Summary */}
                    <div className="w-full flex flex-col gap-4 bg-white md:col-span-5 p-4 sticky top-20 rounded-md h-fit">
                        <h3 className="text-2xl font-semibold text-gray-900">Cart Summary</h3>
                        <div className="flex items-center justify-between gap-4">
                            <p className="text-lg font-medium text-gray-900">Subtotal</p>
                            <p className="text-lg font-medium text-gray-900">${totals.subtotal}</p>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                            <p className="text-lg font-medium text-gray-900">Tax</p>
                            <p className="text-lg font-medium text-gray-900">${totals.tax}</p>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                            <p className="text-lg font-medium text-gray-900">Total</p>
                            <p className="text-lg font-medium text-gray-900">${totals.total}</p>
                        </div>
                        <button onClick={handleCheckout} disabled={processing} className="w-full py-2 text-lg font-semibold text-white bg-black rounded-md hover:opacity-90 disabled:opacity-70 cursor-pointer disabled:cursor-not-allowed">
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Cart;
