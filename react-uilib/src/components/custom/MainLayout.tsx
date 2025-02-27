import { SidebarTrigger } from '../ui/sidebar'
import CSidebar from './layout/CSidebar'
import { Outlet } from 'react-router'

const MainLayout = () => {
    return (
        <div className='flex w-screen h-screen'>
            <CSidebar />
            <main className='w-full flex flex-col h-screen overflow-y-auto p-4'>
                <SidebarTrigger className="cursor-pointer bg-blue-400 text-white hover:bg-blue-500 hover:text-white" />
                <Outlet />
            </main>
        </div>
    )
}

export default MainLayout