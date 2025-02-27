import { ArrowLeft } from 'lucide-react'
import { SidebarTrigger } from '../ui/sidebar'
import { Toaster } from '../ui/sonner'
import CSidebar from './layout/CSidebar'
import { Outlet, useLocation, useNavigate } from 'react-router'

const MainLayout = () => {
    const navigate = useNavigate()
    const path = useLocation().pathname
    return (
        <div className='flex w-screen h-screen'>
            <CSidebar />
            <main className='w-full flex flex-col h-screen overflow-y-auto p-4'>
                <div className="flex gap-4 sticky top-0">
                    <SidebarTrigger className="cursor-pointer w-10 h-10 min-h-10 bg-blue-400 text-white hover:bg-blue-500 hover:text-white" />
                    {
                        path !== '/' && (
                            <button className="flex gap-2 items-center bg-blue-400 p-2 text-white rounded-lg cursor-pointer hover:bg-blue-500" onClick={() => {
                                navigate(-1)
                            }}>
                                <ArrowLeft size={24} />
                                <span>Back</span>
                            </button>
                        )
                    }
                </div>
                <Outlet />
            </main>
            <Toaster />
        </div>
    )
}

export default MainLayout