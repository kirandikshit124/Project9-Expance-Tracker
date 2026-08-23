import { FaEdit, FaTrash } from "react-icons/fa";

export default function ExpenseTable({ data, onEdit, onDelete }) {
    return (
        <div className="bg-white rounded-xl shadow p-5">
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
                    {
                        data.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center py-8 text-gray-500">
                                    No Expenses Yet...
                                </td>
                            </tr>
                        ) : ( data.map((item)=>(
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
                                    { new Date(item.date).toLocaleDateString() }
                                </td>
                                <td className="px-4 py-2">
                                    <div className="flex gap-3 justify-center">
                                        <button
                                            onClick={()=>onDelete(item._id)}
                                            className="text-[#5A3F2E]">
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}