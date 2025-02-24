import { useEffect, useMemo, useState } from "react"
import SectionHeading from "../ui/SectionHeading"
import { getCategories } from "../../libs/APICalls/Products"
import Loading from "../layout/Loading"
import CategoryCard from "./CategoryCard"
import electronicImg from "../../assets/categories/electronic.jpg";
import jeweleryImg from "../../assets/categories/jewelery.jpg";
import womenImg from "../../assets/categories/women.jpg";
import menImg from "../../assets/categories/men.jpg";


const Categories = () => {
    const catImages: { [key: string]: string } = useMemo(() => ({
        "electronics": electronicImg,
        "jewelery": jeweleryImg,
        "women's clothing": womenImg,
        "men's clothing": menImg
    }), []);

    const [categories, setCategories] = useState<string[]>([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getCategories().then((cats) => {
            setCategories(cats)
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    return (
        <section className="px-6 py-16 lg:px-8 w-full">
            <div className="w-full mx-auto max-w-[1440px] items-center gap-4">
                <div className="text-center w-full">
                    <SectionHeading>
                        <i className="text-[#DA9100]">Luxury</i> Segments
                    </SectionHeading>
                </div>
                <div className="grid sm:grid-cols-2 grid-cols-1 w-full items-center gap-4 mt-8" id="categories">
                    {loading && <Loading text="Curating Categories..." />}
                    {categories.map((cat, index) => (
                        <CategoryCard key={index} category={{
                            name: cat,
                            image: catImages[cat as keyof typeof catImages]
                        }} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Categories