import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import TransactionTable from "../components/TransactionTable";
import { getDashboard } from "../services/dashboardService";

export default function Dashboard() {
    const [dashboard, setDashboard] = useState(null);
    const [error, setError] = useState(null);
    async function loadDashboard() {
        try {
            const data = await getDashboard();
            setDashboard(data);
        } catch (err) {
            setError(err.response?.data?.message || "Unable to load dashboard");
        }
    }
    useEffect(() => {
        loadDashboard();
    }, []);
    return (
        <div className="flex bg-[#e8e4e1]">
            <Sidebar className="flex-shrink-0" />
            <div className="flex-1 ml-64">
                <Navbar />
                    <div className="m-8">
                        {error && <p className="px-6 text-red-600">{error}</p>}
                        <TransactionTable transactions={dashboard?.recentTransaction ?? []} />
                    </div>
            </div>
        </div>
    );
}