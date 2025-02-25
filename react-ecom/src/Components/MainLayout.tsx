import { Outlet } from "react-router"
import Header from "./layout/Header"
import SnackBar from "./layout/SnackBar"
import Footer from "./layout/Footer"

const MainLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
            <SnackBar />
        </>
    )
}

export default MainLayout