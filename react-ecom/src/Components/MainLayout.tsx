import { Outlet } from "react-router"
import Header from "./layout/Header"
import SnackBar from "./layout/SnackBar"

const MainLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <footer>
                Footer
            </footer>
            <SnackBar />
        </>
    )
}

export default MainLayout