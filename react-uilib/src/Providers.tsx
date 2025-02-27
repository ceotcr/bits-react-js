import React from 'react'
import { BrowserRouter } from 'react-router'
import { SidebarProvider } from './components/ui/sidebar'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ProductProvider } from './lib/contexts/ProductsContext'
const queryClient = new QueryClient()

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <ProductProvider>
                        <SidebarProvider>
                            {children}
                        </SidebarProvider></ProductProvider>
                </QueryClientProvider>
            </BrowserRouter>
        </>
    )
}

export default Providers