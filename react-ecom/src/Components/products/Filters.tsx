import { useSearchParams } from "react-router";
import { Sort } from "../../libs/interfaces";
import { useEffect } from "react";
import { getCategories } from "../../libs/APICalls/Products";
import { useQuery } from "@tanstack/react-query";
import { MdAdd } from "react-icons/md";

const Filters = ({ filters, setFilters, isAdmin = false, onAddProduct }: {
    filters: { category: string; sort: Sort },
    setFilters: React.Dispatch<React.SetStateAction<{
        category: string;
        sort: Sort;
    }>>,
    isAdmin?: boolean
    onAddProduct?: () => void
}) => {
    const [searchParams] = useSearchParams();

    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: () => getCategories(),
        refetchOnWindowFocus: false,
        retry: 1,
    })

    useEffect(() => {
        const category = searchParams.get('category') || "all"
        if (!categories) return
        if (category && categories.includes(category)) {
            setFilters((prev) => ({ ...prev, category: category === 'all' ? '' : category }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categories, searchParams]);

    return (
        <div
            className="flex sticky top-20 z-50 w-full items-center gap-4 bg-[rgba(255,255,255,0.6)] backdrop-blur-lg p-4 rounded-md">
            <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="p-2 border border-gray-300 bg-white rounded-md">
                <option value="all">Category</option>
                {categories?.map((category) => (
                    <option key={category} value={category}>{category}</option>
                ))}
            </select>
            <select
                value={filters.sort}
                onChange={(e) => setFilters({ ...filters, sort: parseInt(e.target.value) })}
                className="p-2 border border-gray-300 bg-white rounded-md">
                <option value={Sort.DEFAULT}>Sort by Price</option>
                <option value={Sort.ASC}>Low to High</option>
                <option value={Sort.DESC}>High to Low</option>
            </select>
            {
                isAdmin && (
                    <button className="ml-auto p-2 bg-blue-500 text-white rounded-md cursor-pointer"
                        onClick={onAddProduct}>
                        <MdAdd size={24} />
                    </button>
                )
            }
        </div >
    )
}

export default Filters