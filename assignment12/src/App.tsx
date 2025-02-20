import { useEffect, useState } from "react"
import NewPost from "./components/NewPost"
import Posts from "./components/Posts"
import { IPost } from "./libs/interfaces"
import FullPost from "./components/FullPost"
import { getAllPosts } from "./libs/posts"
import PostsByUser from "./components/PostsByUser"

const App = () => {
  const [posts, setPosts] = useState<IPost[] | null>(null)
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)


  const getPosts = async () => {
    setLoading(true)
    try {
      const data = await getAllPosts()
      setPosts(data)
    } catch (err) {
      setError((err as Error).message)
      setTimeout(() => {
        setError(null)
      }, 2000)
    }
    setLoading(false)
  }


  useEffect(() => {
    getPosts()

    return () => {
      setPosts(null)
      setSelectedPost(null)
      setError(null)
      setLoading(false)
    }
  }, [])
  return (
    <div className="p-4 max-w-[1440px] w-full flex flex-col mx-auto gap-8">
      <NewPost setPosts={setPosts} />
      <PostsByUser getAllPosts={getPosts} setPosts={setPosts} />
      {loading && <p className='w-full text-center'>Loading...</p>}
      {error && <p className='w-full text-center text-red-300'>{error}</p>}
      {posts && (
        posts.length === 0 ? <p className="text-center">No posts by the user</p> : <Posts posts={posts} setSelectedPost={setSelectedPost} />
      )}
      {selectedPost && <FullPost setPost={setSelectedPost} post={selectedPost} />}
    </div>
  )
}

export default App