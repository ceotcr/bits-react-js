import NotFoundImage from '../assets/not-found.svg'

const NotFound = ({ isProduct = false }: { isProduct?: boolean }) => {
    return (
        <section className="p-6 w-full">
            <div className="w-full mx-auto max-w-[1440px] flex flex-col items-center justify-center gap-4 min-h-[calc(100vh-160px)]">
                <img src={NotFoundImage} alt="Not Found" className="w-full max-w-[240px] rounded-full mix-blend-multiply h-full mx-auto" />
                <h1 className="text-3xl font-semibold text-gray-900">{
                    isProduct ? "Product" : "Page"
                } Not Found</h1>
                <p className="text-lg font-medium text-gray-900">{
                    isProduct ? "The product you are looking for does not exist." : "The page you are looking for does not exist."
                }</p>
            </div>
        </section>
    )
}

export default NotFound