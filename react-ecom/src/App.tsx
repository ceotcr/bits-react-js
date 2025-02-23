import { BrowserRouter } from "react-router"
import AppRoutes from "./pages/Components/AppRoutes"

function App() {
  return (
    <>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </>
  )
}

export default App
