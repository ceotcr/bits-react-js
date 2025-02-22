import { useState } from "react"
import { useSearchParams } from "react-router"

const Home = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [data, setData] = useState<{ key: string, value: string }>({
        key: '',
        value: ''
    })
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (data.key && data.value) {
            if (searchParams.has(data.key)) {
                searchParams.delete(data.key)
            }
            setSearchParams({
                ...Object.fromEntries(searchParams),
                [data.key]: data.value
            })
            setData({ key: '', value: '' })
        }
    }
    return (
        <div className="w-full flex flex-col py-4 min-h-[calc(100vh-4rem)] items-center justify-center">
            <h1 className="text-4xl font-bold">Add Search Params</h1>
            <p className="mt-4">Search Params: {searchParams.toString()}</p>

            <form onSubmit={handleSearch} className="flex flex-col w-full max-w-md mt-4 bg-[#363636] p-4 rounded-md shadow-md">
                <label htmlFor="key" className="text-lg font-semibold">Key</label>
                <input type="text" id="key" value={data.key} onChange={e => setData({ ...data, key: e.target.value })} className="bg-[#282828] focus:outline-none p-2 rounded-md mt-2" />
                <label htmlFor="value" className="text-lg font-semibold mt-4">Value</label>
                <input type="text" id="value" value={data.value} onChange={e => setData({ ...data, value: e.target.value })} className="bg-[#282828] focus:outline-none p-2 rounded-md mt-2" />
                <button type="submit" className="bg-blue-500 text-white rounded-md p-2 mt-4">Add Search Params</button>
            </form>
        </div>
    )
}

export default Home