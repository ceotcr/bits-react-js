import SectionHeading from "../ui/SectionHeading"
import ProductCard from "../products/ProductCard"
import { useQuery } from "@tanstack/react-query"
import { getProducts } from "../../libs/APICalls/Products"
import Loading from "../layout/Loading"

const Featured = () => {

    const { data: products, isLoading, error, isError } = useQuery({
        queryKey: ["products", 'limit=4'],
        queryFn: async () => await getProducts({ limit: 4 }),
        refetchOnWindowFocus: false,
        retry: 1
    })
    return (
        <section className="p-6 w-full">
            <div className="w-full mx-auto max-w-[1440px] items-center gap-4">
                <div className="text-center w-full">
                    <SectionHeading>
                        Pinnacle of <i className="text-[#DA9102]">Perfection</i>
                    </SectionHeading>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {
                        isLoading && <Loading text="Curating featured products..." />
                    }
                    {!isLoading && products && products.map((product) => {
                        return (
                            <ProductCard key={product.id} product={product} />
                        )
                    })}
                    {
                        isError && error && <p className="text-center text-red-500 col-span-full">{error.message}</p>
                    }
                </div>
            </div>
        </section>
    )
}

export default Featured