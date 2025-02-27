import { Route, Routes } from "react-router"
import MainLayout from "./components/custom/MainLayout"
import Home from "./components/pages/Home"
import Products from "./components/pages/Products"

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />} >
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products:id" element={"products:id"} />
                <Route path="/cart" element={"cart"} />
                <Route path="/users" element={"users"} />
            </Route>
        </Routes>
    )
}

export default AppRoutes