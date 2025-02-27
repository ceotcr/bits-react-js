import { Trash, Pen } from "lucide-react"
import { IProduct } from "../../../lib/interfaces"
import { Card, CardContent, CardTitle } from "../../ui/card"
import { Button } from "../../ui/button"
import { Link, useNavigate } from "react-router"

const CProductCard = ({ product,
    handleDelete
}: {
    product: IProduct,
    handleDelete: () => void
}) => {
    const navigate = useNavigate()

    return (
        <Link to={`/products/${product.id}`} className="w-full h-full">
            <Card className="bg-white shadow-none relative p-0 rounded-lg">
                <CardContent className="mt-auto p-0">
                    <img src={product.image} alt={product.title} className="w-full rounded-lg object-cover object-top h-[300px]" />
                    <div className="absolute top-0 left-0 bottom-0 right-0 bg-gradient-to-b from-transparent via-transparent to-black rounded-lg">
                    </div>

                    <Button className="absolute top-2 left-2 bg-blue-500 hover:bg-blue-600 cursor-pointer w-10 h-10" onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        navigate(`/products/${product.id}/edit`)
                    }}>
                        <Pen size={24} fill="white" />
                    </Button>
                    <Button className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 cursor-pointer w-10 h-10" onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        handleDelete()
                    }
                    }>
                        <Trash size={24} fill="white" />
                    </Button>
                    <CardTitle className="absolute bottom-0 left-0 text-left right-0 p-4 text-white rounded-b-lg">
                        {product.title}
                    </CardTitle>
                </CardContent>
            </Card>
        </Link>
    )
}

export default CProductCard