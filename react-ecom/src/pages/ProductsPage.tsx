import { useEffect, useMemo, useState } from "react"
import SectionHeading from "../Components/ui/SectionHeading"
import { IProduct, Sort } from "../libs/interfaces"
import { getCategories, getProducts } from "../libs/APICalls/Products"
import { useSearchParams } from "react-router"
import Loading from "../Components/layout/Loading"
import ProductCard from "../Components/products/ProductCard"
import Filters from "../Components/products/Filters"

const ProductsPage = () => {
    const [categories, setCategories] = useState<string[]>([])
    const [products, setProducts] = useState<IProduct[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [filters, setFilters] = useState<{ category: string; sort: Sort }>({
        category: "",
        sort: Sort.DEFAULT,
    })
    const [searchParams] = useSearchParams()

    const sortedProducts = useMemo(
        () => {
            if (filters.sort === Sort.ASC) {
                return [...products].sort((a, b) => a.price - b.price)
            } else if (filters.sort === Sort.DESC) {
                return [...products].sort((a, b) => b.price - a.price)
            }
            return products
        },
        [products, filters.sort]
    )

    useEffect(() => {
        getCategories()
            .then((response) => {
                setCategories(response)
                const category = searchParams.get('category') || ""
                if (category && categories.includes(category)) {
                    setFilters({ ...filters, category })
                }
            })
            .catch((error) => {
                console.log(error)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setLoading(true)
        getProducts({ category: filters.category === "all" ? "" : filters.category })
            .then((response) => {
                setProducts(response)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
                setLoading(false)
            })
    }, [filters.category])
    return (
        <section className="p-6 w-full">
            <div className="w-full mx-auto max-w-[1440px] flex flex-col items-center gap-4 min-h-screen">
                <SectionHeading className="!text-2xl">
                    <i className="text-[#DA9100]">
                        Opulenze
                    </i><br />
                    Shop faster, Shop Smarter
                </SectionHeading>

                <Filters categories={categories} filters={filters} setFilters={setFilters} />

                {loading && (

                    <div className="w-full mx-auto max-w-[1440px] flex flex-col items-center gap-4 min-h-screen">
                        <Loading text="Curating Products" />
                    </div>

                )}
                {
                    !loading &&
                    products.length > 0 && (
                        <div className="w-full mx-auto max-w-[1440px] grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {
                                sortedProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))
                            }
                        </div>
                    )
                }
            </div>

        </section>
    )
}

export default ProductsPage
