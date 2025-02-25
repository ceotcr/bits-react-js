import { LiaShoppingBagSolid } from "react-icons/lia"
import { Link, useParams } from "react-router"
import { useCart } from "../../contexts/CartContext"
import { useAuth } from "../../contexts/AuthContext"
import { useEffect, useState } from "react"
import { MdClose, MdMenu } from "react-icons/md"

const Header = () => {
    const { quantity } = useCart()
    const { isAuthenticated, logout } = useAuth()
    const [mobileMenu, setMobileMenu] = useState(false)
    const params = useParams()

    useEffect(() => {
        setMobileMenu(false)
    }, [params])
    return (
        <div className="w-full sticky top-0 z-[51]">
            <header className="bg-[rgba(255,255,255,0.6)] backdrop-blur-lg">
                <nav className="flex justify-between items-center w-full max-w-[1440px] mx-auto p-4">
                    <h2 className="text-2xl font-semibold">Opulenze</h2>
                    <ul className="hidden items-center gap-4 text-sm font-medium text-gray-900 lg:flex">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/products">Products</Link></li>
                        {
                            isAuthenticated && <li><Link to="/admin">Admin</Link></li>
                        }
                        <li>
                            {
                                !isAuthenticated ? <Link to="/login">Login</Link> :
                                    <button className="cursor-pointer" onClick={logout}>Logout</button>
                            }
                        </li>
                    </ul>
                    <div className="flex items-center gap-4">
                        <Link to={'/cart'} className="relative">
                            <LiaShoppingBagSolid size={24} />
                            <span className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-5 h-5 text-xs flex justify-center items-center">{quantity}</span>
                        </Link>
                        <button className="lg:hidden cursor-pointer" onClick={() => setMobileMenu(!mobileMenu)}>
                            {mobileMenu ? <MdClose size={28} /> : <MdMenu size={28} />}
                        </button>
                    </div>
                </nav>
            </header>
            {
                mobileMenu && (
                    <nav className="flex flex-col gap-4 font-medium text-gray-800 lg:hidden absolute top-20 text-xl right-4 py-4 rounded bg-[rgba(255,255,255,0.6)] backdrop-blur-lg shadow-2xl">
                        <Link className="px-8" to="/">Home</Link>
                        <Link className="px-8" to="/products">Products</Link>
                        {
                            isAuthenticated && <Link className="px-8" to="/admin">Admin</Link>
                        }
                        {
                            !isAuthenticated ? <Link className="px-8" to="/login">Login</Link> :
                                <button className="cursor-pointer px-8 text-left" onClick={logout}>Logout</button>
                        }

                    </nav>
                )
            }
        </div>
    )
}

export default Header