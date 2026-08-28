import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaUser, FaEnvelope, FaLock, } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { getProfile, updateProfile, changePassword } from "../services/profileService";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [changingPassword, setChangingPassword] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [profile, setProfile] = useState({
        name: "",
        email: "",
    });
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: "",
        newPassword: "",
    });
    const { updateUser } = useAuth();
    useEffect(() => {
        loadProfile();
    }, []);
    const loadProfile = async () => {
        try {
            const response = await getProfile();
            setProfile({
                name: response.user.name,
                email: response.user.email,
            });
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Unable to load profile"
            );
        } finally {
            setLoading(false);
        }
    };
    const handleProfileChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value,
        });
    };
    const handlePasswordChange = (e) => {
        setPasswordForm({
            ...passwordForm,
            [e.target.name]: e.target.value,
        });
    };
    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        try {
            setSaving(true);
            const response = await updateProfile(profile);
            toast.success(
                response.message ||
                "Profile updated successfully"
            );
            updateUser({
                name: response.user.name,
                email: response.user.email,
            });
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Unable to update profile"
            );
        } finally {
            setSaving(false);
        }
    };
    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (passwordForm.newPassword.length < 8) {
            toast.error(
                "New password must be at least 8 characters"
            );
            return;
        }
        try {
            setChangingPassword(true);
            const response = await changePassword(
                passwordForm
            );
            toast.success(
                response.message ||
                "Password changed successfully"
            );
            setPasswordForm({
                currentPassword: "",
                newPassword: "",
            });
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Unable to change password"
            );
        } finally {
            setChangingPassword(false);
        }
    };
    if (loading) {
        return <div>
            <div className="animate-pulse space-y-4">
                <div className="h-25 bg-gray-200 rounded" />
                <div className="h-200 md:h-110 bg-gray-200 rounded mt-30" />
            </div>
        </div>;
    }
    return (
        <div className="min-h-screen bg-[#e8e4e1]">
            <Sidebar className="flex-shrink-0" 
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}/>
            <div className="md:ml-64">
                <Navbar onMenuClick={() => setSidebarOpen(true)} />
                <main className="p-4 md:p-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-slate-800">
                            Profile
                        </h1>
                        <p className="text-gray-500 mt-1">
                            Manage your account information
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-2xl shadow p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-11 h-11 rounded-full bg-[#e4d5bc] text-[#6B4E3D] flex items-center justify-center">
                                    <FaUser />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold">
                                        Personal Information
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        Update your name and email
                                    </p>
                                </div>
                            </div>
                            <form
                                onSubmit={handleProfileSubmit}
                                className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Name
                                    </label>
                                    <div className="relative">
                                        <FaUser className=" absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 " />
                                        <input
                                            type="text"
                                            name="name"
                                            value={profile.name}
                                            onChange={handleProfileChange}
                                            className=" w-full border rounded-lg py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-[#6B4E3D] "
                                            required />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Email
                                    </label>
                                    <div className="relative">
                                        <FaEnvelope className=" absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="email"
                                            name="email"
                                            value={profile.email}
                                            onChange={handleProfileChange}
                                            className=" w-full border rounded-lg py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-[#6B4E3D] "
                                            required />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className=" bg-[#6B4E3D] hover:bg-[#5A3F2E] disabled:bg-[#e4d5bc] disabled:text-black text-white px-6 py-3 rounded-lg font-medium ">
                                    {saving
                                        ? "Saving..."
                                        : "Save Changes"
                                    }
                                </button>
                            </form>
                        </div>
                        <div className="bg-white rounded-2xl shadow p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className=" w-11 h-11 rounded-full bg-[#e4d5bc] text-[#6B4E3D] flex items-center justify-center ">
                                    <FaLock />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold">
                                        Change Password
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        Keep your account secure
                                    </p>
                                </div>
                            </div>
                            <form
                                onSubmit={handlePasswordSubmit}
                                className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Current Password
                                    </label>
                                    <input
                                        type="password"
                                        name="currentPassword"
                                        value={
                                            passwordForm.currentPassword
                                        }
                                        onChange={
                                            handlePasswordChange
                                        }
                                        className=" w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#6B4E3D]"
                                        required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        New Password
                                    </label>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        value={
                                            passwordForm.newPassword
                                        }
                                        onChange={
                                            handlePasswordChange
                                        }
                                        className=" w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#6B4E3D]"
                                        minLength={8} required />
                                    <p className="text-xs text-gray-500 mt-2">
                                        Password must contain at least 8 characters.
                                    </p>
                                </div>
                                <button
                                    type="submit"
                                    disabled={changingPassword}
                                    className=" bg-[#6B4E3D] hover:bg-[#5A3F2E] disabled:bg-[#e4d5bc] disabled:text-black text-white px-6 py-3 rounded-lg font-medium">
                                    {changingPassword
                                        ? "Changing..."
                                        : "Change Password"
                                    }
                                </button>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}