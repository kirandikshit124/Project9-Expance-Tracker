import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import SummaryCard from "../components/SummaryCard";
import { FaMoneyBillWave, FaWallet, FaPiggyBank, FaPercent } from "react-icons/fa";
import TransactionTable from "../components/TransactionTable";
import { getDashboard } from "../services/dashboardService";
import ExpensePieChart from "../components/ExpensePieChart";
import IncomeExpenseBarChart from "../components/IncomeExpenseBarChart";

export default function Dashboard() {
    const [dashboard, setDashboard] = useState(null);
    // const [error, setError] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
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
    if (!dashboard) {
        return <div>
                <div className="animate-pulse space-y-4">
                    <div className="h-20 bg-gray-200 rounded" />
                    <div className="h-32 bg-gray-200 rounded m-9" />
                    <div className="h-92 bg-gray-200 rounded m-9" />
                    <div className="h-12 bg-gray-200 rounded m-9" />
                    <div className="h-222 bg-gray-200 rounded m-9" />
                </div>
            </div>
    }
    return (
        <div className="flex bg-[#e8e4e1]">
            <Sidebar className="flex-shrink-0" 
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}/>
            <div className="flex-1 min-w-0 w-full md:ml-64">
                <Navbar onMenuClick={() => setSidebarOpen(true)}/>
                    <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <SummaryCard
                            title="Income"
                            value={dashboard.monthlyIncome}
                            icon={<FaMoneyBillWave />}
                            color="text-green-600" />
                        <SummaryCard
                            title="Expense"
                            value={dashboard.monthlyExpence}
                            icon={<FaWallet />}
                            color="text-red-500" />
                        <SummaryCard
                            title="Savings"
                            value={dashboard.savings}
                            icon={<FaPiggyBank />}
                            color="text-blue-500" />
                        <SummaryCard
                            title="Saving Rate"
                            value={`${dashboard.savingRate}%`}
                            icon={<FaPercent />}
                            color="text-yellow-500"
                            currency={false} />
                    </div>
                    <div className="grid lg:grid-cols-2 gap-6 mt-8">
                        <ExpensePieChart
                            data={dashboard.expenseDistribution} />
                        <IncomeExpenseBarChart
                            income={dashboard.monthlyIncome}
                            expense={dashboard.monthlyExpence} />
                    </div>
                    <div className="m-8">
                        {/* {error && <p className="px-6 text-red-600">{error}</p>} */}
                        <TransactionTable transactions={dashboard?.recentTransaction ?? []} />
                    </div>
                </div>
            </div>
        </div>
    );
}