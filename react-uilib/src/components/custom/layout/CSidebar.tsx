import { NavLink } from "react-router"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader } from "../../ui/sidebar"

const CSidebar = () => {
    return (
        <Sidebar>
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
            </SidebarContent>
            <SidebarFooter>
                <p>Account</p>
            </SidebarFooter>
        </Sidebar>
    )
}

export default CSidebar