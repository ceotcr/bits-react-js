/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useMemo } from "react"
import Filters from "../Components/products/Filters"
import { useAuth } from "../contexts/AuthContext"
import { getProducts } from "../libs/APICalls/Products"
import { IProduct, Sort } from "../libs/interfaces"
import ProductCard from "../Components/products/ProductCard"
import AddOrEditProduct from "../Components/admin/AddOrEditProduct"
import { deleteProduct } from "../libs/APICalls/Admin"
import { useSnackbar } from "../contexts/SnackBarContext"

const AdminPage = () => {
    const { isAuthenticated } = useAuth()
    const [filters, setFilters] = useState<{ category: string; sort: Sort }>({
        category: "",
        sort: Sort.DEFAULT,
    })
    const [editProduct, setEditProduct] = useState<IProduct | undefined>(undefined)
    const [showModal, setShowModal] = useState(false)

    const [products, setProducts] = useState<IProduct[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    useMemo(() => {
        const fetchProducts = async () => {
            setLoading(true)
            try {
                const response = await getProducts({ limit: 0, category: filters.category === 'all' ? '' : filters.category })
                setProducts(response)
            } catch (error) {
                setError("Error Fetching Products")
            }
            setLoading(false)
        }
        fetchProducts()
    }, [filters.category])

    const { showSnackbar } = useSnackbar()

    const sortedProducts = useMemo(
        () => {
            if (!products) return []
            if (filters.sort === Sort.ASC) {
                return [...products].sort((a, b) => a.price - b.price)
            } else if (filters.sort === Sort.DESC) {
                return [...products].sort((a, b) => b.price - a.price)
            }
            return products
        },
        [products, filters.sort]
    )
    const handleDelete = async (id: number) => {
        try {
            await deleteProduct(id)
            setProducts((prev) => prev.filter((p) => p.id !== id))
            showSnackbar("Product Deleted Successfully", 0)
        } catch (error) {
            showSnackbar("Error Deleting Product", 2)
        }
    }
    if (!isAuthenticated) {
        return (
            <div>Not Authorized</div>
        )
    }
    return (
        <section className="p-6 w-full">
            <div className="w-full mx-auto max-w-[1440px] items-center min-h-screen gap-4 h-fit flex flex-col">
                <h2 className="text-2xl font-semibold text-gray-900 mr-auto">Admin</h2>
                <Filters filters={filters} setFilters={setFilters} isAdmin onAddProduct={() => {
                    setEditProduct(undefined)
                    setShowModal(true)
                }} />
                {loading && (
                    <div className="w-full mx-auto max-w-[1440px] flex flex-col items-center gap-4 min-h-screen">
                        <h1 className="text-2xl font-bold text-center">Loading Products</h1>
                    </div>
                )}
                {error && !loading && (
                    <div className="w-full mx-auto max-w-[1440px] flex flex-col items-center gap-4 min-h-screen">
                        <h1 className="text-2xl font-bold text-center">Error Fetching Products</h1>
                    </div>
                )}
                <div className="w-full mx-auto max-w-[1440px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {sortedProducts.map((product) => (
                        <ProductCard isAdmin key={product.id} product={product} onEdit={() => {
                            setEditProduct(product)
                            setShowModal(true)
                        }} onDelete={() => {
                            handleDelete(product.id)
                        }} />
                    ))}

                </div>
            </div>
            {
                showModal && (
                    <AddOrEditProduct setProducts={setProducts} product={editProduct} closeModal={() => setShowModal(false)} />
                )
            }
        </section>
    )
}

export default AdminPage