import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { getDashboard } from "../services/dashboardService";

export default function Dashboard() {
    const [dashboard, setDashboard] = useState(null);
    async function loadDashboard() {
        const data = await getDashboard();
        setDashboard(data)
    }
    useEffect(() => {
        loadDashboard();
    }, []);
    return (
        <div className="flex bg-slate-100">
            <Sidebar className="flex-shrink-0" />
            <div className="flex-1 ml-64">
                <Navbar />
            </div>
        </div>
    );
}