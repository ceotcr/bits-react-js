import { useCartStore } from "@/store/cartStore"
import { Card, CardContent, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Link } from "react-router"
import { useOrderStore } from "@/store/ordersStore"
import { useAuthStore } from "@/store/userStore"
import { toast } from "sonner"
const Cart = () => {
    const { cart, incQuantity, decQuantity, removeFromCart, clearCart } = useCartStore()
    const { user, isAuthenticated } = useAuthStore()
    const { addOrder } = useOrderStore()
    const handleCreateOrder = async () => {
        if (!user.id) toast.error("Please login to create order")
        else {
            await addOrder(cart, user.id)
            clearCart()
        }

    }
    return (
        <div className="w-full mt-6">
            <h2 className="text-2xl font-normal font-sans">Cart</h2>
            {
                cart.length === 0 ?
                    <div className="w-full flex mt-8 items-end">
                        <h2 className="text-2xl font-normal font-sans">Cart is empty</h2>
                        <Link to="/products" className="ml-4 text-blue-500">Shop now</Link>
                    </div>
                    :
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4">
                        {cart.map((item) => (
                            <Card key={item.id} className="p-4 shadow-none rounded-md">
                                <CardContent className="flex items-center justify-between p-0">
                                    <div className="flex gap-4 items-center">
                                        <img src={item.image} alt={item.title} className="w-20 h-20 object-cover object-top" />
                                        <div>
                                            <CardTitle>{item.title}</CardTitle>
                                            <p className="text-gray-500">{item.category}</p>
                                            <p className="text-gray-500">$ {item.price}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end gap-2">
                                        <Button variant="outline" className="cursor-pointer" onClick={() => removeFromCart(item.id)}>Remove</Button>
                                        <div className="flex gap-4 items-center">
                                            <Button variant="outline" className="cursor-pointer" onClick={() => decQuantity(item.id)}>-</Button>
                                            <span>{item.quantity}</span>
                                            <Button variant="outline" className="cursor-pointer" onClick={() => incQuantity(item.id)}>+</Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                        }
                    </div>
            }
            {
                isAuthenticated && cart.length > 0 &&

                <Button className="mt-4 bg-blue-500 hover:bg-blue-600 hover:text-white cursor-pointer text-white"
                    onClick={handleCreateOrder}>Checkout</Button>
            }
            {
                !isAuthenticated && (
                    <div className="mt-4">
                        <h2 className="text-xl font-medium">Please login to checkout</h2>
                        <Link to="/login" className="text-blue-500">Login</Link>
                    </div>
                )
            }
        </div>
    )
}

export default Cart