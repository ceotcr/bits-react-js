import { NavLink } from "react-router"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader } from "../../ui/sidebar"
import { useAuthStore } from "@/store/authStore"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/store/cartStore"
import { useOrderStore } from "@/store/ordersStore"

const CSidebar = () => {
    const { isAuthenticated, logout } = useAuthStore()
    const { cart, clearCart } = useCartStore()
    const { orders } = useOrderStore()
    return (
        <Sidebar className="pl-2">
            <SidebarHeader>
                <h2 className="text-xl font-medium">Opulenze</h2>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <NavLink to="/" className={(({ isActive }) => isActive ? "text-black" : "text-slate-700")}>Home</NavLink>
                </SidebarGroup>
                <SidebarGroup className="flex flex-col gap-2">
                    <NavLink to="/products" className={(({ isActive }) => isActive ? "text-black" : "text-slate-700")}>Products</NavLink>
                    <NavLink to="/products/add" className={(({ isActive }) => isActive ? "text-black ml-4" : "text-slate-700 ml-4")}>Add Product</NavLink>
                </SidebarGroup>
                <SidebarGroup>
                    <NavLink to="/cart" className={(({ isActive }) => isActive ? "text-black" : "text-slate-700")}>
                        <div className="flex items-center gap-2">
                            <span>
                                Cart
                            </span>
                            <span className="bg-blue-500 text-white rounded-full px-4 font-serif">
                                {cart.length}
                            </span>
                        </div>
                    </NavLink>
                </SidebarGroup>
                <SidebarGroup>
                    <NavLink to="/orders" className={(({ isActive }) => isActive ? "text-black" : "text-slate-700")}>
                        <div className="flex items-center gap-2">
                            <span>
                                Orders
                            </span>{
                                isAuthenticated &&
                                <span className="bg-blue-500 text-white rounded-full px-4 font-serif">
                                    {orders.length}
                                </span>
                            }
                        </div>
                    </NavLink>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                {
                    isAuthenticated ? (
                        <Button variant="outline" onClick={
                            () => {
                                logout()
                                clearCart()
                            }
                        } className="cursor-pointer">
                            Logout
                        </Button>
                    ) : (
                        <NavLink to="/login" className="text-slate-700">Login</NavLink>
                    )

                }
            </SidebarFooter>
        </Sidebar>
    )
}

export default CSidebar