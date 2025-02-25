import { BrowserRouter } from "react-router"
import AppRoutes from "./Components/AppRoutes"
import { CartProvider } from "./contexts/CartContext"
import { SnackbarProvider } from "./contexts/SnackBarContext"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { AuthProvider } from "./contexts/AuthContext"
const queryClient = new QueryClient()
function App() {
  return (
    <>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <SnackbarProvider>
            <AuthProvider>
              <CartProvider>
                <AppRoutes />
              </CartProvider>
            </AuthProvider>
          </SnackbarProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </>
  )
}

export default App
