import { MdClose } from 'react-icons/md'
import { IComment, IPost } from '../libs/interfaces'
import { useEffect, useState } from 'react'
import { getComments } from '../libs/posts'

const FullPost = ({ post, setPost }: { post: IPost, setPost: React.Dispatch<React.SetStateAction<IPost | null>> }) => {
    const [comments, setComments] = useState<IComment[] | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        setLoading(true)
        getComments(post.id).then((data) => {
            setComments(data)
        }).catch((err) => {
            setError(err.message)
        }).finally(() => {
            setLoading(false)
        })

        return () => {
            setLoading(false)
            setComments(null)
            setError(null)
        }
    }, [post.id])

    return (
        <div className='fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] backdrop-blur-lg flex justify-center items-center'>
            <div className='w-full max-w-[512px] bg-[#323232] p-4 flex flex-col gap-4 rounded-lg h-[80vh] overflow-y-auto'>
                <div className="flex items-start justify-between gap-4">
                    <h2 className='text-xl font-medium'>{post.title}</h2>
                    <button className='cursor-pointer' onClick={() => setPost(null)}><MdClose size={32} /></button>
                </div>
                <p className='font-light'>{post.body}</p>

                <hr className='border-[#5E6369]' />

                <h3 className='text-lg font-medium text-center'>Comments</h3>
                {loading && <p className='w-full text-center'>Loading...</p>}
                {error && <p>{error}</p>}
                <div className='flex flex-col gap-2'>
                    {
                        comments &&
                        (
                            comments.length === 0 ?
                                <p className='text-center'>No comments available</p> :

                                comments.map((comment) => (
                                    <div key={comment.id} className='p-2 bg-[#444444] rounded-lg'>
                                        <p className='font-light'>{comment.body}</p>
                                        <p className='text-xs text-[#A7A7A7] ml-auto text-right'>- {comment.email}</p>
                                    </div>
                                )))
                    }
                </div>
            </div>
        </div>
    )
}

export default FullPost