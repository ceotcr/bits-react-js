import { SidebarTrigger } from '../ui/sidebar'
import { Toaster } from '../ui/sonner'
import CSidebar from './layout/CSidebar'
import { Outlet } from 'react-router'

const MainLayout = () => {
    return (
        <div className='flex w-screen h-screen'>
            <CSidebar />
            <main className='w-full flex flex-col h-screen overflow-y-auto p-4'>
                <SidebarTrigger className="cursor-pointer w-10 h-10 min-h-10 bg-blue-400 text-white hover:bg-blue-500 hover:text-white" />
                <Outlet />
            </main>
            <Toaster />
        </div>
    )
}

export default MainLayout