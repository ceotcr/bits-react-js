import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";

const AuthPage = () => {
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate()
    useEffect(() => {
        if (isAuthenticated) {
            navigate(-1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    const [credentials, setCredentials] = useState({ username: "", password: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await login(credentials.username, credentials.password);
    };



    return (
        <section className="p-6 w-full">
            <div className="w-full mx-auto max-w-[1440px] items-center justify-center gap-4 min-h-[calc(100vh-10rem)] flex flex-col">

                <h1 className="text-2xl text-center font-semibold text-gray-900 w-fit mx-auto">
                    <i className="text-[#DA9100]">Opulenze</i><br />
                    Shop faster, Shop Smarter
                </h1>

                <div className="w-full max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
                    <h2 className="text-2xl font-semibold text-gray-900">Login</h2>

                    <form className="mt-4" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                autoComplete="username"
                                value={credentials.username}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                autoComplete="current-password"
                                value={credentials.password}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <button
                                type="submit"
                                className="cursor-pointer w-full px-3 py-2 text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default AuthPage;
