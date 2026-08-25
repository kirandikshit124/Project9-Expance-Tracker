import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";

export default function SummaryCard({ title, value, icon, color, currency = true }) {
    return (
        <div className="bg-white rounded-2xl p-6 shadow">
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-gray-500">
                        {title}
                    </p>
                    <h2 className="text-3xl font-bold mt-2">
                        {currency ? `₹ ${value}` : value}
                    </h2>
                </div>
                <div className={`text-4xl ${color}`}>
                    {icon}
                </div>
            </div>
        </div>
    );
}