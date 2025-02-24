import { Routes, Route } from "react-router"
import MainLayout from "./MainLayout"
import HomePage from "../pages/HomePage"
import ProductsPage from "../pages/ProductsPage"
import ProductPage from "../pages/ProductPage"
import NotFound from "../pages/NotFound"
import CartPage from "../pages/CartPage"

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:id" element={<ProductPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes