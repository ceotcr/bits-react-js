import { useEffect, useState } from "react"
import NewPost from "./components/NewPost"
import Posts from "./components/Posts"
import { IPost } from "./libs/interfaces"
import FullPost from "./components/FullPost"
import { getAllPosts } from "./libs/posts"

const App = () => {
  const [posts, setPosts] = useState<IPost[] | null>(null)
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    setLoading(true)
    getAllPosts().then((data) => {
      setPosts(data)
    }).catch((err) => {
      setError(err.message)
    }).finally(() => {
      setLoading(false)
    })

    return () => {
      setPosts(null)
      setSelectedPost(null)
      setError(null)
      setLoading(false)
    }
  }, [])
  return (
    <div className="p-4 max-w-[1440px] w-full flex flex-col mx-auto gap-8">
      <NewPost />
      {loading && <p className='w-full text-center'>Loading...</p>}
      {error && <p className='w-full text-center'>{error}</p>}
      {posts && <Posts posts={posts} setSelectedPost={setSelectedPost} />}
      {selectedPost && <FullPost setPost={setSelectedPost} post={selectedPost} />}
    </div>
  )
}

export default App