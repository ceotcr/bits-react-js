import { Outlet } from "react-router"
import Header from "./layout/Header"

const MainLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <footer>
                Footer
            </footer>
        </>
    )
}

export default MainLayout