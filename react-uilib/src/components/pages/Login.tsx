import { useAuthStore } from "@/store/userStore"
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useOrderStore } from "@/store/ordersStore";

const Login = () => {
    const { login } = useAuthStore()
    const [user, setUser] = useState({ username: "", password: "" })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.id]: e.target.value })
    }
    const navigate = useNavigate()
    const { loadOrders } = useOrderStore()
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const loggedIn = await login(user.username, user.password, loadOrders)
        if (loggedIn) {
            setUser({ username: "", password: "" })
            navigate("/")
        }
    }
    return (
        <div className="w-full mt-6">
            <h1 className="text-2xl font-semibold text-center">Login</h1>
            <form className="flex flex-col gap-4 max-w-lg w-full mx-auto mt-4" onSubmit={handleSubmit}>
                <Label htmlFor="username">Username</Label>
                <Input required id="username" type="text" value={user.username} onChange={handleChange} />

                <Label htmlFor="password">Password</Label>
                <Input required id="password" type="password" value={user.password} onChange={handleChange} />
                <Button type="submit" className="cursor-pointer" >Login</Button>
            </form>
        </div>
    )
}

export default Login