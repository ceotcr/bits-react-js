import { useQuery } from "@tanstack/react-query"
import { getProducts } from "../../lib/APICalls/products"
import { useCallback, useReducer } from "react";
import { filterReducer } from "../../lib/reducers";
import CProductCard from "../custom/products/CProductCard";
import Filters from "../custom/products/Filters";

const Products = () => {
    const [filters, dispatch] = useReducer(filterReducer, {
        category: 'all',
        sort: 'asc',
        limit: 0
    })

    const { data: products, error, isLoading: loading } = useQuery({
        queryKey: ['products', filters.category, filters.sort, filters.limit],
        queryFn: () => getProducts(filters),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: 1,
    })

    const changeCategory = useCallback((value: string) => {
        dispatch({ type: 'SET_CATEGORY', payload: value })
    }, [])

    const changeSort = useCallback((value: 'asc' | 'desc') => {
        dispatch({ type: 'SET_SORT', payload: value })
    }, [])

    const changeLimit = useCallback((value: number) => {
        dispatch({ type: 'SET_LIMIT', payload: value })
    }, [])

    if (loading) return <p>Loading...</p>

    if (error) return <p>Error: {error.message}</p>

    return (
        <div className="py-4 flex flex-col gap-4">
            <p>Products</p>
            <Filters filters={filters} changeCategory={changeCategory} changeSort={changeSort} changeLimit={changeLimit} />
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
                {
                    products &&
                    products.map((product) => {
                        return (
                            <CProductCard key={product.id} product={product} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Products