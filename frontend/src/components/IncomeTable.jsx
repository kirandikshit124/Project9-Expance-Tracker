import { FaEdit, FaTrash } from "react-icons/fa";

export default function IncomeTable({ data, onEdit, onDelete }) {
    return (
        <div className="bg-white rounded-xl shadow p-5">
            {
                data.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        No Incomes Yet...
                    </div>
                ) : (<>
                    <div className="hidden md:block">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th>Edit</th>
                                    <th>Description</th>
                                    <th>Category</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item) => (
                                    <tr key={item._id} className="border-b h-14">
                                        <td>
                                            <div className="flex gap-3 justify-center">
                                                <button
                                                    onClick={() => onEdit(item)}
                                                    className="text-[#675951]">
                                                    <FaEdit />
                                                </button>
                                            </div>
                                        </td>
                                        <td className="text-center px-4 py-2">{item.description}</td>
                                        <td className="text-center px-4 py-2">{item.category}</td>
                                        <td className="text-center px-4 py-2">
                                            ₹ {item.amount}
                                        </td>
                                        <td className="text-center px-4 py-2">
                                            {new Date(item.date).toLocaleDateString()}
                                        </td>
                                        <td>
                                            <div className="flex gap-3 justify-center">
                                                <button
                                                    onClick={() => onDelete(item._id)}
                                                    className="text-[#5A3F2E]">
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="md:hidden space-y-4">
                        {data.map((item) => (
                            <div
                                key={item._id}
                                className="border rounded-xl p-4 shadow-sm">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-semibold">
                                        {item.description}
                                    </h3>
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => onEdit(item)}
                                            className="text-[#675951] ml-2">
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => onDelete(item._id)}
                                            className="text-[#5A3F2E]">
                                            <FaTrash />
                                        </button>
                                    </div>
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
                                <p className="font-bold text-lg mt-3 text-green-600">
                                    ₹ {item.amount}
                                </p>
                            </div>
                        ))}
                    </div>
                </>
                )}
        </div>
    )
}