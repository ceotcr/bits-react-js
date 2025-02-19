import { useState } from "react"
import { createPost } from "../libs/posts"

const NewPost = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const [data, setData] = useState({
        title: "",
        body: "",
        userId: -1
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setError(null)
        setSuccess(false)
        if (e.target.name === "userId") {
            if (isNaN(Number(e.target.value))) {
                return
            }
            setData({
                ...data,
                [e.target.name]: Number(e.target.value)
            })
        }
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setSuccess(false)

        if (data.title.trim() === "" || data.body.trim() === "" || data.userId === -1) {
            setError("All fields are required")
            setTimeout(() => {
                setError(null)
            }, 3000)
            setLoading(false)
            return
        }

        const response = await createPost(data)

        if (response instanceof Error) {
            setError(response.message)
        } else {
            setData({
                title: "",
                body: "",
                userId: -1
            })
            setSuccess(true)
            setTimeout(() => {
                setSuccess(false)
            }, 3000)
        }
        setLoading(false)
    }
    return (
        <>
            <form onSubmit={handleSubmit} className="w-full max-w-[720px] mx-auto rounded-lg flex flex-col p-4 gap-2 shadow-2xl outline outline-[#5E6369]">
                <input name="title" type="text" className="w-full focus:outline-none text-lg font-bold" placeholder="Title..." value={data.title} onChange={handleChange} />
                <textarea name="body" className="w-full focus:outline-none" placeholder="Description..." value={data.body} onChange={handleChange}></textarea>
                <div className="flex justify-between gap-4">
                    <input name="userId" type="number" className="w-full focus:outline-none" placeholder="User ID" value={
                        data.userId === -1 ? "" : data.userId
                    } onChange={handleChange} />
                    <button disabled={loading}
                        type="submit"
                        className="py-2 px-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                        Post
                    </button>
                </div>
            </form>
            {error && <p className="text-red-500 text-center">{error}</p>}
            {success && <p className="text-green-500 text-center">Post created successfully</p>}
        </>
    )
}

export default NewPost