import { Routes, Route, useLocation } from "react-router"
import MainLayout from "./MainLayout"
import HomePage from "../pages/HomePage"
import ProductsPage from "../pages/ProductsPage"
import ProductPage from "../pages/ProductPage"
import NotFound from "../pages/NotFound"
import CartPage from "../pages/CartPage"
import AuthPage from "../pages/AuthPage"
import AdminPage from "../pages/AdminPage"
import { useEffect } from "react"


const docTitles = {
    '/': 'Home | Opulenze',
    '/products': 'Products | Opulenze',
    '/cart': 'Cart | Opulenze',
    '/login': 'Login | Opulenze',
    '/admin': 'Admin | Opulenze',
}


const AppRoutes = () => {
    const location = useLocation()
    useEffect(() => {
        document.title = docTitles[location.pathname as keyof typeof docTitles] || 'Opulenze'
    }, [location])
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:id" element={<ProductPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/login" element={<AuthPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes