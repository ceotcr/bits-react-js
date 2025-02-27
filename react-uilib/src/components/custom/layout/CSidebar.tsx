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
                    <nav className="flex flex-col gap-2">
                        <NavLink to="/" className={(({ isActive }) => isActive ? "text-black" : "text-slate-700")}>Home</NavLink>
                        <NavLink to="/products" className={(({ isActive }) => isActive ? "text-black" : "text-slate-700")}>Products</NavLink>
                    </nav>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <p>Account</p>
            </SidebarFooter>
        </Sidebar>
    )
}

export default CSidebar