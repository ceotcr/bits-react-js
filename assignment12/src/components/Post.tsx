import { IPost } from "../libs/interfaces"

const Post = ({ postData, onClick }: { postData: IPost, onClick: () => void }) => {
    return (
        <div className="p-4 shadow-md flex flex-col gap-4 rounded-md outline outline-[#5E6369] cursor-pointer" onClick={onClick}>
            <h2 className="text-xl font-medium">{postData.title}</h2>
            <p className="font-light">{postData.body}</p>
        </div>
    )
}

export default Post