import { Routes, Route } from "react-router"
import MainLayout from "./MainLayout"
import HomePage from "../pages/HomePage"

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<p>Products</p>} />
                <Route path="/products/:id" element={<p>Product</p>} />
                <Route path="*" element={<p>Hello</p>} />
            </Route>
        </Routes>
    )
}

export default AppRoutes