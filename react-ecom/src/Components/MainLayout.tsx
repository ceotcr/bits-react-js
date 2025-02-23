import { Outlet } from "react-router"

const MainLayout = () => {
    return (
        <>
            <header>
                Header
            </header>
            <Outlet />
            <footer>
                Footer
            </footer>
        </>
    )
}

export default MainLayout