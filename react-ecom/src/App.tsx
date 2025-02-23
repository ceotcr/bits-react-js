import { BrowserRouter } from "react-router"
import AppRoutes from "./Components/AppRoutes"

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
