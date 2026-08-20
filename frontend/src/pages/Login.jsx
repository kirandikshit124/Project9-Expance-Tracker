import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
export default function Login() {
    const navigate=useNavigate();
    const { login }=useAuth();
    const [form, setForm]=useState({
        email: "",
        password: "",
    });
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            setLoading(true);
            const res=await loginUser(form);
            login(res.user, res.token);
            toast.success("Login Successful");
            navigate("/dashboard");
        }catch (err){
            toast.error(
                err.response?.data?.message || "Login Failed"
            );
        }finally{
            setLoading(false);
        }
    };
    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">
                <h1 className="text-3xl font-bold text-center mb-8">
                    Expense Tracker
                </h1>
                <form
                    onSubmit={handleSubmit}
                    className="space-y-5">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500" />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500" />
                    <button
                        disabled={loading}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-3 font-semibold transition">
                        {loading ? "Logging In..." : "Login"}
                    </button>
                </form>
                <p className="text-center mt-6">
                    Don't have an account?
                    <Link
                        to="/register"
                        className="text-indigo-600 font-semibold ml-2">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}