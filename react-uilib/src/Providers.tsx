import React from 'react'
import { BrowserRouter } from 'react-router'
import { SidebarProvider } from './components/ui/sidebar'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
const queryClient = new QueryClient()

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <SidebarProvider>
                        {children}
                    </SidebarProvider>
                </QueryClientProvider>
            </BrowserRouter>
        </>
    )
}

export default Providers