import { IPost } from "../libs/interfaces"
import Post from "./Post"

const Posts = ({ posts, setSelectedPost }: { posts: IPost[]; setSelectedPost: React.Dispatch<React.SetStateAction<IPost | null>> }) => {
    return (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-4 grid-cols-1">
            {
                posts.map((post) => (
                    <Post key={post.id} postData={post} onClick={() => { setSelectedPost(post) }} />
                ))
            }
        </div>
    )
}

export default Posts