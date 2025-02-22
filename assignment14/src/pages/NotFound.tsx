import { useEffect } from "react"

const NotFound = () => {
    useEffect(() => {
        document.title = '404 | Page Not Found'
    }, [])
    return (
        <div className="text-2xl w-full flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
            <h2 className="text-4xl font-bold">404</h2>
            <h3 className="text-2xl">Page Not Found</h3>
        </div>
    )
}

export default NotFound