export const getAllPosts = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts")
    const data = await res.json()
    if (!res.ok) {
        throw new Error(data.message || "Failed to fetch posts" + " Status:" + res.status)
    }
    return data
}


export const getComments = async (postId: number) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
    const data = await res.json()
    if (!res.ok) {
        throw new Error(data.message || "Failed to fetch comments" + " Status:" + res.status)
    }
    return data
}

export const createPost = async (post: Post) => {
    const res = await fetch("https://jsonplaceholder.typicode.com/postss", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    })
    const data = await res.json()
    if (!res.ok) {
        throw new Error(data.message || "Failed to create post" + " Status:" + res.status)
    }
    return data
}

type Post = {
    title: string
    body: string
    userId: number
}

export const getPostsByUser = async (userId: number) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    const data = await res.json()
    if (!res.ok) {
        throw new Error(data.message || "Failed to fetch posts" + " Status:" + res.status)
    }
    return data
}