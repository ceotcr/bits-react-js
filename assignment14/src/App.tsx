import { BrowserRouter, Link, Route, Routes } from "react-router"
import Home from "./pages/Home"
import Blogs from "./pages/Blogs"
import NotFound from "./pages/NotFound"
import Blog from "./pages/Blog"

function App() {
  return (
    <BrowserRouter>
      <nav className="flex items-center justify-center gap-4 py-4 bg-[rgba(50,50,50,.5)] backdrop-blur-lg text-white sticky top-0 z-10">
        <div className="flex items-center gap-4 w-[96%] mx-auto max-w-[1440px] justify-center">
          <Link to="/">Home</Link>
          <Link to="/blogs">Blogs</Link>
          <Link to="/test">NotFound-Test</Link>
        </div>
      </nav>
      <div className="w-[96%] mx-auto max-w-[1440px]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:blogid" element={<Blog />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
