import { BrowserRouter } from "react-router"
import AppRoutes from "./Components/AppRoutes"
import { CartProvider } from "./contexts/CartContext"
import { SnackbarProvider } from "./contexts/SnackBarContext"

function App() {
  return (
    <>
      <BrowserRouter>
        <SnackbarProvider>
          <CartProvider>
            <AppRoutes />
          </CartProvider>
        </SnackbarProvider>
      </BrowserRouter>
    </>
  )
}

export default App
