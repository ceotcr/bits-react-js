import { useEffect, useState } from "react"
import { IPost } from "../types/posts"
import { Link } from "react-router"

const Blogs = () => {
    const [posts, setPosts] = useState<IPost[]>([])
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
            .then(response => response.json())
            .then(data => setPosts(data))
            .catch(error => console.error(error))
    }, [])
    return (
        <div className="w-full flex flex-col items-center gap-4 min-h-[calc(100vh-6rem)] py-4">
            <h1 className="text-2xl">Blogs</h1>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {posts.map(post => (
                    <Link to={`/blogs/${post.id}`} key={post.id} className="bg-[#282828] p-4 rounded">
                        <h2 className="text-xl font-bold">{post.title}</h2>
                        <p>{post.body}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Blogs