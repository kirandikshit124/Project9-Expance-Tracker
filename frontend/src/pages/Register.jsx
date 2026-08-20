import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { registerUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

export default function Register() {
    const navigate=useNavigate();
    const { login }=useAuth();
    const [loading, setLoading]=useState(false);
    const [form, setForm]=useState({
        name: "",
        email: "",
        password: "",
    });
    const handleChange=(e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit=async (e) => {
        e.preventDefault();
        try{
            setLoading(true);
            const res=await registerUser(form);
            login(res.user, res.token);
            toast.success("Registration Successful");
            navigate("/login");
        }catch (err){
            toast.error(
                err.response?.data?.message || "Registration Failed"
            );
        }finally{
            setLoading(false);
        }
    };
    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-8">
                    Create Account
                </h1>
                <form
                    onSubmit={handleSubmit}
                    className="space-y-5">
                    <input
                        name="name"
                        placeholder="Full Name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"/>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"/>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"/>
                    <button
                        disabled={loading}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-3 font-semibold">
                        {loading ? "Creating..." : "Register"}
                    </button>
                </form>
                <p className="text-center mt-6">
                    Already have an account?
                    <Link
                        to="/login"
                        className="ml-2 text-indigo-600 font-semibold">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}