import { useMemo } from "react"
import SectionHeading from "../ui/SectionHeading"
import { getCategories } from "../../libs/APICalls/Products"
import Loading from "../layout/Loading"
import CategoryCard from "./CategoryCard"
import electronicImg from "../../assets/categories/electronic.jpg";
import jeweleryImg from "../../assets/categories/jewelery.jpg";
import womenImg from "../../assets/categories/women.jpg";
import menImg from "../../assets/categories/men.jpg";
import { useQuery } from "@tanstack/react-query"


const Categories = () => {
    const catImages: { [key: string]: string } = useMemo(() => ({
        "electronics": electronicImg,
        "jewelery": jeweleryImg,
        "women's clothing": womenImg,
        "men's clothing": menImg
    }), []);

    const { data: categories, isLoading, isError, error } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
        retry: 1,
        refetchOnWindowFocus: false,
    })

    return (
        <section className="px-6 py-16 lg:px-8 w-full">
            <div className="w-full mx-auto max-w-[1440px] items-center gap-4">
                <div className="text-center w-full">
                    <SectionHeading>
                        <i className="text-[#DA9100]">Luxury</i> Segments
                    </SectionHeading>
                </div>
                <div className="grid sm:grid-cols-2 grid-cols-1 w-full items-center gap-4 mt-8" id="categories">
                    {isLoading && <Loading text="Curating Categories..." />}
                    {!isLoading && categories?.map((cat, index) => (
                        <CategoryCard key={index} category={{
                            name: cat,
                            image: catImages[cat as keyof typeof catImages]
                        }} />
                    ))}
                    {
                        !isLoading && categories?.length === 0 && (
                            <div className="w-full flex items-center justify-center text-center text-lg col-span-full font-medium">
                                No Categories Found
                            </div>
                        )
                    }

                    {isError && (
                        <div className="w-full items-center justify-center col-span-full text-center text-lg font-medium">
                            {error?.message || "Failed to fetch categories"}
                        </div>
                    )}

                </div>
            </div>
        </section>
    )
}

export default Categories