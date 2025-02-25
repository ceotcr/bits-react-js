import { Link, useNavigate } from "react-router"
import { IProduct } from "../../libs/interfaces"
import { LiaShoppingBagSolid } from "react-icons/lia"
import { useCart } from "../../contexts/CartContext"
import { useAuth } from "../../contexts/AuthContext"
import { MdDelete, MdEdit } from "react-icons/md"

const ProductCard = (
    { product, isAdmin = false, onEdit, onDelete }: { product: IProduct; isAdmin?: boolean, onEdit: () => void, onDelete: () => void }
) => {
    const { add } = useCart()
    const { isAuthenticated } = useAuth()
    const navigate = useNavigate()
    const handleAddToCart = () => {
        if (!isAuthenticated) {
            navigate('/login')
            return
        }
        add(product)
    }
    return (
        <div className="group relative overflow-hidden">
            <Link to={`/products/${product.id}`}>
                <img src={product.image} alt={product.title} className="aspect-square w-full transition-transform group-hover:scale-105 rounded-md bg-gray-200 object-cover object-top lg:aspect-auto lg:h-80" />
            </Link>
            <div className="mt-4 flex gap-4 justify-between details">
                <Link to={`/products/${product.id}`} className="flex flex-col justify-start text-left items-start w-fit max-w-6/10">
                    <h3 className="text-lg line-clamp-1 font-medium text-gray-900 group-hover:text-gray-800">{product.title}</h3>
                    <p className="text-sm font-medium text-gray-900">${product.price}</p>
                </Link>
                {
                    !isAdmin && (
                        <button className="p-4 w-4-10 rounded-md cursor-pointer add-to-cart" onClick={handleAddToCart}>
                            <span className="sr-only">Add to cart</span>
                            <LiaShoppingBagSolid size={24} />
                        </button>
                    )
                }
                {
                    isAdmin && (
                        <div className="flex w-fit gap-4">
                            <button className="rounded-md cursor-pointer add-to-cart"
                                onClick={onEdit}
                            >
                                <span className="sr-only">Edit</span>
                                <MdEdit size={24} />
                            </button>
                            <button className="rounded-md cursor-pointer add-to-cart"
                                onClick={onDelete}
                            >
                                <span className="sr-only">Delete</span>
                                <MdDelete size={24} />
                            </button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default ProductCard