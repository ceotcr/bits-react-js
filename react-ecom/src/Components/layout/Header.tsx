import { LiaShoppingBagSolid } from "react-icons/lia"
import { MdOutlineAccountCircle } from "react-icons/md"
import { Link } from "react-router"

const Header = () => {
    return (
        <header className="sticky top-0 z-50 bg-[rgba(255,255,255,0.6)] backdrop-blur-lg">
            <nav className="flex justify-between items-center w-full max-w-[1440px] mx-auto p-4">
                <h2 className="text-2xl font-semibold">Opulenze</h2>
                <ul className="flex items-center gap-4 text-sm font-medium text-gray-900">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/products">Products</Link></li>
                </ul>
                <div className="flex items-center gap-4">
                    <LiaShoppingBagSolid size={24} />
                    <MdOutlineAccountCircle size={24} />
                </div>
            </nav>
        </header>
    )
}

export default Header