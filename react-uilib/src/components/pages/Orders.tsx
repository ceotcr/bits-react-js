import { useOrderStore } from "@/store/ordersStore"
import { useAuthStore } from "@/store/userStore"
import { Link } from "react-router"
import ConfirmDeleteDialog from "../custom/products/ConfirmDeleteDialog"
import { useState } from "react"

const Orders = () => {
    const { isAuthenticated } = useAuthStore()
    const { orders, deleteOrder } = useOrderStore()

    const [dialog, setDialog] = useState({
        isOpen: false,
        orderId: -1
    })
    const onConfirm = async () => {
        await deleteOrder(dialog.orderId)
        setDialog({
            isOpen: false,
            orderId: -1
        })
    }
    const closeDialog = () => {
        setDialog({
            isOpen: false,
            orderId: -1
        })
    }
    if (!isAuthenticated)
        return (
            <div className="w-full mt-6">
                <h2 className="text-2xl font-normal font-sans">Please login to see your orders</h2>
                <Link to="/login" className="text-blue-500">Login</Link>
            </div>
        )
    return (
        <div className="w-full mt-6">
            <h2 className="text-2xl font-normal font-sans">Orders</h2>
            {
                orders.length > 0 ?
                    <div className="grid grid-cols-1 gap-4 mt-4 lg:grid-cols-2">
                        {

                            orders.map((order, index) => {
                                return (
                                    <div key={index} className="p-4">
                                        <div className="flex w-full justify-between items-center">
                                            <h3 className="text-lg font-semibold">Order {order.id}</h3>
                                            <button onClick={
                                                () => {
                                                    setDialog({
                                                        isOpen: true,
                                                        orderId: order.id
                                                    })
                                                }
                                            } className="ml-2 bg-red-400 text-white p-2 rounded-lg cursor-pointer">Delete</button>
                                        </div>
                                        <table className="w-full mt-4">
                                            <thead className="border-b border-gray-200">
                                                <tr className="">
                                                    <th className="text-center border-r border-gray-200 border-t p-1 border-l"
                                                    >ProductID</th>
                                                    <th className="text-center border-r border-gray-200 border-t p-1"
                                                    >Quantity</th>
                                                </tr>
                                            </thead>
                                            <tbody className="">
                                                {
                                                    order.products.map((product, index) => {
                                                        return (
                                                            <tr key={index} className="border-b border-gray-200">
                                                                <td className="text-center border-r border-l border-gray-200"
                                                                >{product.productId}</td>
                                                                <td className="text-center border-r border-gray-200"
                                                                >{product.quantity}</td>
                                                            </tr>
                                                        )
                                                    }
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                )
                            }
                            )
                        }
                    </div>
                    : <h3 className="text-lg font-semibold">No orders found</h3>

            }
            <ConfirmDeleteDialog open={dialog.isOpen} onConfirm={onConfirm} onClose={closeDialog} />
        </div>
    )
}

export default Orders