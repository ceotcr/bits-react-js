import { useEffect, useState } from "react"
import { IPost } from "../types/posts"
import { useParams } from "react-router"

const Blogs = () => {
    const [post, setPost] = useState<IPost>({ id: 0, title: '', body: '', userId: 0 })
    const { blogid } = useParams()
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)
    const loadPostAndComments = async () => {
        setLoading(true)
        document.title = 'Blog | Loading...'
        const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${blogid}`)
        const post = await postResponse.json()
        setPost(post)
        document.title = `Blog | ${post.title}`
        const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${blogid}/comments`)
        const comments = await commentsResponse.json()
        setComments(comments)
        setLoading(false)
    }

    useEffect(() => {
        loadPostAndComments()
    }, [])

    if (loading) {
        return (
            <div className="w-full flex items-center justify-center min-h-[calc(100vh-6rem)] py-4">
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <div className="w-full mx-auto grid lg:grid-cols-3 grid-cols-1 gap-4 min-h-[calc(100vh-6rem)] py-4">
            <div className="lg:col-span-2 col-span-1 max-w-[600px] h-fit p-4 rounded flex flex-col gap-4 !sticky top-[4.5rem]">
                <p className="text-xs text-gray-400">
                    Blog ID: {post.id}
                </p>
                <p className="text-lg">
                    By User {post.userId}
                </p>
                <h1 className="text-4xl font-bold">
                    {post.title}
                </h1>
                <p className="text-xl">
                    {post.body}
                </p>
            </div>
            <div className="grid grid-cols-1 gap-4">
                <h2 className="text-2xl font-bold">Comments</h2>
                {comments.map((comment: any) => (
                    <div key={comment.id} className="bg-[#282828] p-4 rounded flex flex-col gap-2">
                        <p>{comment.body}</p>
                        <p className="text-xs text-gray-400 w-fit ml-auto">By {comment.name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Blogs