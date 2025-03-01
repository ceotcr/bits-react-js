import { Route, Routes } from "react-router"
import MainLayout from "./components/custom/MainLayout"
import Home from "./components/pages/Home"
import Products from "./components/pages/Products"
import Product from "./components/pages/Product"
import AddProduct from "./components/pages/AddProduct"
import UpdateProduct from "./components/pages/UpdateProduct"
import Login from "./components/pages/Login"
import Cart from "./components/pages/Cart"
import Orders from "./components/pages/Orders"
import Users from "./components/pages/Users"
import AddUser from "./components/pages/AddUser"
import UpdateUser from "./components/pages/UpdateUser"
import { User } from "lucide-react"

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />} >
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/add" element={<AddProduct />} />
                <Route path="/products/:id" element={<Product />} />
                <Route path="/products/:id/edit" element={<UpdateProduct />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="*" element={"Not Found"} />
                <Route path="/users" element={<Users />} />
                <Route path="/users/add" element={<AddUser />} />
                <Route path="/users/:id" element={<User />} />
                <Route path="/users/:id/edit" element={<UpdateUser />} />

            </Route>
        </Routes>
    )
}

export default AppRoutes