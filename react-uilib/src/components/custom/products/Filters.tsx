import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../../lib/APICalls/products";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
const Filters = ({ changeCategory, changeSort, changeLimit, filters }: {
    changeCategory: (value: string) => void,
    changeSort: (value: 'asc' | 'desc') => void,
    changeLimit: (value: number) => void
    filters: {
        category: string,
        sort: string,
        limit: number
    }
}) => {

    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: () => getCategories(),
        refetchOnWindowFocus: false,
        retry: 1,
    })

    return (
        <div
            className="flex sticky top-20 z-50 w-full items-center gap-4 bg-[rgba(255,255,255,0.6)] backdrop-blur-lg p-4 rounded-md">
            <Select onValueChange={(value) => changeCategory(value as string)}>
                <SelectTrigger>
                    <SelectValue placeholder={filters.category.charAt(0).toUpperCase() + filters.category.slice(1)} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    {
                        categories && categories.map((category) => {
                            return (
                                <SelectItem
                                    key={category}
                                    value={category}
                                >
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </SelectItem>
                            )
                        })
                    }
                </SelectContent>
            </Select>
            <Select onValueChange={(value) => changeSort(value as 'asc' | 'desc')}>
                <SelectTrigger>
                    <SelectValue placeholder={filters.sort == 'asc' ? 'Ascending' : 'Descending'} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="asc">Ascending</SelectItem>
                    <SelectItem value="desc">Descending</SelectItem>
                </SelectContent>
            </Select>
            <Select onValueChange={(value) => changeLimit(parseInt(value as string))}>
                <SelectTrigger>
                    <SelectValue placeholder={filters.limit == 0 ? 'All' : filters.limit.toString()} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value={"0"}>All</SelectItem>
                    <SelectItem value={"5"}>5</SelectItem>
                    <SelectItem value={"10"}>10</SelectItem>
                    <SelectItem value={"15"}>15</SelectItem>
                    <SelectItem value={"20"}>20</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}

export default Filters