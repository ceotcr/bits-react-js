import { useMemo, useState } from "react"
import SectionHeading from "../Components/ui/SectionHeading"
import { Sort } from "../libs/interfaces"
import { getProducts } from "../libs/APICalls/Products"
import Loading from "../Components/layout/Loading"
import ProductCard from "../Components/products/ProductCard"
import Filters from "../Components/products/Filters"
import { useQuery } from "@tanstack/react-query"

const ProductsPage = () => {
    const [filters, setFilters] = useState<{ category: string; sort: Sort }>({
        category: "",
        sort: Sort.DEFAULT,
    })

    const { data: products, error, isLoading: loading } = useQuery({
        queryKey: ['products', filters.category],
        queryFn: () => getProducts({ category: filters.category === "all" ? "" : filters.category }),
        enabled: filters.category !== undefined,
        refetchOnWindowFocus: false,
        retry: 1,
    })

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

    return (
        <section className="p-6 w-full">
            <div className="w-full mx-auto max-w-[1440px] flex flex-col items-center gap-4 min-h-screen">
                <SectionHeading className="!text-2xl">
                    <i className="text-[#DA9100]">
                        Opulenze
                    </i><br />
                    Shop faster, Shop Smarter
                </SectionHeading>

                <Filters filters={filters} setFilters={setFilters} />

                {loading && (

                    <div className="w-full mx-auto max-w-[1440px] flex flex-col items-center gap-4 min-h-screen">
                        <Loading text="Curating Products" />
                    </div>

                )}
                {
                    error && !loading && (
                        <div className="w-full mx-auto max-w-[1440px] flex flex-col items-center gap-4 min-h-screen">
                            <h1 className="text-2xl font-bold text-center">Error Fetching Products</h1>
                        </div>
                    )
                }
                {
                    !error && !loading && products &&
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
