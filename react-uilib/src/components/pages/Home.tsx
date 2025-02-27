import { Link } from "react-router"

const Home = () => {
    return (
        <div className="py-4">
            <span className="">
                Nothing to see here!
            </span> &nbsp;
            <Link to="/products" className="underline">
                Visit Products
            </Link>
        </div>
    )
}

export default Home