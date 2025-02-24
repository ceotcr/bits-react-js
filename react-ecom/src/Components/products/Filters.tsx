import { Sort } from "../../libs/interfaces";

const Filters = ({ categories, filters, setFilters }: {
    categories: string[], filters: {
        category: string;
        sort: Sort;
    },
    setFilters: (filters: {
        category: string;
        sort: Sort;
    }) => void;
}) => {
    return (
        <div
            className="flex sticky top-20 z-50 mt-4 w-full items-end gap-4 bg-[rgba(255,255,255,0.6)] backdrop-blur-lg p-4 rounded-md">
            <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="p-2 border border-gray-300 bg-white rounded-md">
                <option value="all">Category</option>
                {categories.map((category) => (
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
        </div>
    )
}

export default Filters