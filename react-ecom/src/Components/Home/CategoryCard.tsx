import { useNavigate } from "react-router"

const CategoryCard = ({ category }: {
    category: {
        name: string
        image: string
    }
}) => {
    const navigate = useNavigate()
    return (
        <div
            onClick={() => navigate(`/products?category=${category.name}`)}
            className="p-8 cursor-pointer flex flex-col ring-1 ring-gray-900/10 text-3xl whitespace-nowrap  hover:ring-gray-900/20 transition duration-300 min-h-[120px] ease-in-out bg-cover bg-center text-center items-center justify-center bg-no-repeat text-white"
            style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${category.image})` }}>
            {category.name.slice(0, 1).toUpperCase() + category.name.slice(1)}
        </div>
    )
}

export default CategoryCard