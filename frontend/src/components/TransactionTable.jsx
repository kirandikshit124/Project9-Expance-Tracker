import { useState } from "react";

export default function TransactionTable({ transactions }) {
    const [search, setSearch] = useState("");
    const filteredData = transactions.filter(item =>
        item.description.toLowerCase().includes(search.toLowerCase()) || item.category.toLowerCase().includes(search.toLowerCase())
    ).sort((a, b) => new Date(b.date) - new Date(a.date));
    return (
        <>
            <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border rounded-lg px-4 py-2 w-full mb-4 outline-none"/>
            <div className="bg-white rounded-xl shadow p-5">
                <h2 className="font-bold text-xl mb-4">
                    Recent Transactions
                </h2>
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
                        {
                            filteredData.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center py-8 text-gray-500">
                                        No Transactions Yet...
                                    </td>
                                </tr>
                            ) : (filteredData.map((item) => (
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
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}