import { FaChartPie, FaWallet, FaMoneyBill, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
    const { user } = useAuth();
    return (
        <aside className="fixed top-0 left-0 w-64 bg-[#6B4E3D] text-white h-screen p-6">
            <h1 className="text-2xl font-bold mb-10">
                Expense Tracker
            </h1>
            <nav className="space-y-5">
                <Link
                    to="/dashboard"
                    className="flex gap-3 items-center transition duration-300 hover:font-bold">
                    <FaChartPie /> Dashboard
                </Link>
                <Link
                    to="/income"
                    className="flex gap-3 items-center transition duration-300 hover:font-bold">
                    <FaMoneyBill /> Income
                </Link>
                <Link
                    to="/expense"
                    className="flex gap-3 items-center transition duration-300 hover:font-bold">
                    <FaWallet /> Expense
                </Link>
                <Link
                    to="/profile"
                    className="flex gap-3 items-center transition duration-300 hover:font-bold">
                    <FaUser /> Profile
                </Link>
            </nav>
            <footer className="absolute bottom-6 left-6 text-m text-white flex justify-between items-center gap-2">
                <span className="bg-[#f3e9dd] text-xs text-[#6B4E3D] rounded-full w-6 h-6 flex items-center justify-center">
                    {user?.name.charAt(0)}
                </span>
                <span> {user?.name} </span>
            </footer>
        </aside>
    );
}