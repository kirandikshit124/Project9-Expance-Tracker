import { useState } from "react";

export default function TransactionTable({ transactions, range, onRangeChange }) {
    const [search, setSearch] = useState("");
    const filteredData = transactions.filter(item =>
        item.description.toLowerCase().includes(search.toLowerCase()) || item.category.toLowerCase().includes(search.toLowerCase())
    ).sort((a, b) => new Date(b.date) - new Date(a.date));
    return (
        <>
            <div className="flex sm:flex-row gap-3 mb-4">
            <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border rounded-lg px-4 py-2 w-full outline-none" />
            <select
                value={range}
                onChange={(e) => onRangeChange(e.target.value)}
                className="border rounded-lg outline-none sm:w-40">
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
            </select>
            </div>
            <div className="bg-white rounded-xl shadow p-5">
                <h2 className="font-bold text-xl mb-4">
                    Recent Transactions
                </h2>
                {
                    filteredData.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="text-center py-8 text-gray-500">
                                No Transactions Yet...
                            </td>
                        </tr>
                    ) : (<>
                        <div className="hidden md:block">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th>Description</th>
                                        <th>Category</th>
                                        <th>Amount</th>
                                        <th>Date</th>
                                        <th>Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.map((item) => (
                                        <tr key={item._id} className="border-b h-14">
                                            <td className="text-center px-4 py-2">{item.description}</td>
                                            <td className="text-center px-4 py-2">{item.category}</td>
                                            <td className="text-center px-4 py-2">
                                                ₹ {item.amount}
                                            </td>
                                            <td className="text-center px-4 py-2">
                                                {new Date(item.date).toLocaleDateString()}
                                            </td>
                                            <td className="text-center px-4 py-2">
                                                <span className={`text-center px-3 py-1 rounded-full
                                        ${item.type === "income"
                                                        ? "bg-[#e4d5bc] text-black"
                                                        : "bg-[#a68665] text-white"}`}>
                                                    {item.type}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="md:hidden space-y-4">
                            {filteredData.map((item) => (
                                <div key={item._id} className="border rounded-lg p-4 shadow-sm">
                                    <div className="flex justify-between items-start gap-3">
                                        <h3 className="font-semibold text-base">
                                            {item.description}
                                        </h3>
                                        <span
                                            className={`shrink-0 px-3 py-1 rounded-full text-sm ${item.type === "income"
                                                ? "bg-[#e4d5bc] text-black"
                                                : "bg-[#a68665] text-white"
                                                }`}>
                                            {item.type}
                                        </span>
                                    </div>
                                    <p className="text-gray-500 text-sm mt-3">
                                        Category: {item.category}
                                    </p>
                                    <p className="text-gray-500 text-sm mt-1">
                                        Date:{" "}
                                        {new Date(
                                            item.date
                                        ).toLocaleDateString()}
                                    </p>
                                    <p className="font-bold text-lg mt-3">
                                        ₹ {item.amount}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </>
                    )}
            </div>
        </>
    );
}