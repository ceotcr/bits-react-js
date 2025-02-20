import React from "react"
import { IPost } from "../libs/interfaces"
import { getPostsByUser } from "../libs/posts"
import { MdRefresh } from "react-icons/md";

const PostsByUser = ({ setPosts, getAllPosts }: { getAllPosts: () => Promise<void>; setPosts: React.Dispatch<React.SetStateAction<IPost[] | null>> }) => {
    const [userId, setUserId] = React.useState<number>(-1)
    const [error, setError] = React.useState<string | null>(null)
    const [loading, setLoading] = React.useState<boolean>(false)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPosts(null)
        if (e.target.value === "") {
            setUserId(-1)
            return
        }
        setUserId(Number(e.target.value))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        if (userId === -1) {
            setError("User ID is required")
            setTimeout(() => {
                setError(null)
            }, 2000)
            setLoading(false)
            return
        }
        try {
            setError(null)
            const data = await getPostsByUser(userId)
            setPosts(data)
        } catch (err) {
            setError((err as Error).message)
            setTimeout(() => {
                setError(null)
            }, 2000)
        } finally {
            setLoading(false)
        }
    }
    return (
        <>

            <form onSubmit={handleSubmit} className="w-full max-w-[720px] mx-auto rounded-lg p-1 flex gap-2 shadow-2xl outline outline-[#5E6369]">
                <input type="number" placeholder="Get Posts by UserID" className="p-4 rounded-lg focus:outline-none w-full" value={userId === -1 ? "" : userId} onChange={handleChange} />
                <button type="submit" className="p-2 bg-blue-500 text-white rounded-lg whitespace-nowrap cursor-pointer hover:bg-blue-600"
                >Get posts</button>
                <button type="button" onClick={getAllPosts} className="p-2 bg-blue-500 text-white rounded-lg whitespace-nowrap cursor-pointer hover:bg-blue-600"
                ><MdRefresh size={32} /></button>
            </form>
            {loading && <p className="w-full text-center">Loading...</p>}
            {error && <p className="w-full text-center text-red-300">{error}</p>}
        </>
    )
}

export default PostsByUser