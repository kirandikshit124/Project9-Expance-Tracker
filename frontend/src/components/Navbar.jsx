import { useAuth } from "../context/AuthContext";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = async () => {
        if(!window.confirm("Are you sure you want to logout?")) return;
        await logout();
        toast.success("Logged out successfully");
        navigate("/login");
    }
    return (
        <header className="bg-white shadow h-20 flex justify-between items-center px-8">
            <div>
                <h3 className="font-semibold">
                    {user?.name}
                </h3>
                <p className="text-gray-500 text-sm">
                    {user?.email}
                </p>
            </div>
            <button className="flex items-center gap-2 bg-[#6B4E3D] hover:bg-[#5A3F2E] text-white px-4 py-2 rounded-lg"
                onClick={handleLogout}>
                <IoIosLogOut /> Logout
            </button>
        </header>
    );
}