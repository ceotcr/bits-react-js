import { useEffect, useState } from "react"
import { IProduct } from "../../libs/interfaces"
import SectionHeading from "../ui/SectionHeading"
import { getProducts } from "../../libs/APICalls/Products"
import ProductCard from "../products/ProductCard"

const Featured = () => {
    const [products, setProducts] = useState<IProduct[]>([])

    useEffect(() => {
        getProducts({ limit: 4 }).then((data) => {
            setProducts(data)
        }).catch((error) => {
            console.error(error)
        }
        )
    }, [])
    return (
        <section className="p-6 w-full">
            <div className="w-full mx-auto max-w-[1440px] items-center gap-4">
                <div className="text-center w-full">
                    <SectionHeading>
                        Pinnacle of <i className="text-[#DA9102]">Perfection</i>
                    </SectionHeading>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => {
                        return (
                            <ProductCard key={product.id} product={product} />
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default Featured