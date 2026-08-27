import { FaChartPie, FaWallet, FaMoneyBill, FaUser } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar({ isOpen, onClose }) {
    const { user } = useAuth();
    return (<>
        {isOpen && (
            <div className={"fixed inset-0 bg-black/50 bg-opacity-50 z-40 md:hidden"} onClick={onClose}></div>
        )}
        <aside className={`fixed top-0 left-0 z-50 w-64 bg-[#6B4E3D] text-white h-screen p-6 ${isOpen ? "block" : "hidden"} md:block`}>
            <h1 className="text-2xl font-bold mb-10">
                Expense Tracker
            </h1>
            <nav className="space-y-5">
                <NavLink
                    to="/dashboard"
                    className={({ isActive }) => `flex gap-3 items-center rounded-lg px-3 py-2 transition duration-300 hover:font-bold ${isActive ? "font-bold" : ""}`}
                    onClick={onClose}>
                    <FaChartPie /> Dashboard
                </NavLink>
                <NavLink
                    to="/income"
                    className={({ isActive }) => `flex gap-3 items-center rounded-lg px-3 py-2 transition duration-300 hover:font-bold ${isActive ? "font-bold" : ""}`}
                    onClick={onClose}>
                    <FaMoneyBill /> Income
                </NavLink>
                <NavLink
                    to="/expense"
                    className={({ isActive }) => `flex gap-3 items-center rounded-lg px-3 py-2 transition duration-300 hover:font-bold ${isActive ? "font-bold" : ""}`}
                    onClick={onClose}>
                    <FaWallet /> Expense
                </NavLink>
                <NavLink
                    to="/profile"
                    className={({ isActive }) => `flex gap-3 items-center rounded-lg px-3 py-2 transition duration-300 hover:font-bold ${isActive ? "font-bold" : ""}`}
                    onClick={onClose}>
                    <FaUser /> Profile
                </NavLink>
            </nav>
            <footer className="absolute bottom-6 left-6 text-m text-white flex justify-between items-center gap-2">
                <Link to="/profile" className="flex space-x-2">
                <span className="bg-[#f3e9dd] text-xs text-[#6B4E3D] rounded-full w-6 h-6 flex items-center justify-center">
                    {user?.name.charAt(0)}
                </span>
                <span> {user?.name} </span>
                </Link>
            </footer>
        </aside>
    </>);
}