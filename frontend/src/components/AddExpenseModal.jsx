import { useEffect, useState } from "react";

export default function AddExpenseModal({ open, onClose, onSubmit, editData }) {
    const [form, setForm] = useState({
        description: "",
        amount: "",
        category: "",
        date: ""
    });
    useEffect(() => {
        if (editData) {
            setForm({
                description: editData.description,
                amount: editData.amount,
                category: editData.category,
                date: editData.date ? editData.date.split("T")[0] : "",
            });
        } else {
            setForm({
                description: "",
                amount: "",
                category: "",
                date: "",
            });
        }
    }, [editData, open]);
    if (!open) return null;
    const handleSave = () => {
        onSubmit(form);
        setForm({
            description: "",
            amount: "",
            category: "",
            date: ""
        });
    };
    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
            <div className="bg-white rounded-2xl w-[450px] p-6">
                <h2 className="text-2xl font-bold mb-6">
                    {editData ? "Edit Expense" : "Add Expense"}
                </h2>
                <div className="space-y-4">
                    <input
                        className="w-full border rounded-lg p-3"
                        placeholder="Description"
                        value={form.description}
                        onChange={(e)=>
                            setForm({
                                ...form,
                                description:e.target.value
                            })}/>
                    <input
                        className="w-full border rounded-lg p-3"
                        type="number"
                        placeholder="Amount"
                        value={form.amount}
                        onChange={(e)=>
                            setForm({
                                ...form,
                                amount:e.target.value
                            })}/>
                    <input
                        className="w-full border rounded-lg p-3"
                        placeholder="Category"
                        value={form.category}
                        onChange={(e)=>
                            setForm({
                                ...form,
                                category:e.target.value
                            })}/>
                    <input
                        className="w-full border rounded-lg p-3"
                        type="date"
                        value={form.date}
                        onChange={(e)=>
                            setForm({
                                ...form,
                                date:e.target.value
                            })}/>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={onClose}
                        className="border rounded-lg px-5 py-2">
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="bg-[#e4d5bc] text-black rounded-lg px-5 py-2">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}