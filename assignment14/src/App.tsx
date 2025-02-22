import { BrowserRouter, Link, Route, Routes } from "react-router"

function App() {
  return (
    <main className="w-[96%] mx-auto max-w-[1440px]">
      <BrowserRouter>
        <nav className="flex space-x-4">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        <Routes>
          <Route path="/" element={<>Home</>} />
          <Route path="/about" element={<>About</>} />
          <Route path="/contact" element={<>Contact</>} />
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
