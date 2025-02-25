import { Link } from "react-router"
const Footer = () => {
    return (
        <footer className="bg-black text-white">
            <div className="w-full mx-auto max-w-[1440px] p-6">
                <nav>
                    <ul className="flex items-center justify-center gap-x-6">
                        <li><Link to="/" className="text-lg font-medium">Home</Link></li>
                        <li><Link to="/products" className="text-lg font-medium">Products</Link></li>
                    </ul>
                </nav>
                <div className="mt-4 text-center">
                    <p className="text-sm font-medium">© <span>
                        {new Date().getFullYear()}
                    </span> Opulenze. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer

