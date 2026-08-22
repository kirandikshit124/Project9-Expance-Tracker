import { useEffect, useState } from "react";

export default function AddIncomeModal({ open, onClose, onSubmit, editData }) {
    const [form, setForm] = useState({
        description: "",
        amount: "",
        category: "",
        date: ""
    });
    useEffect(() => {
        if (editData) {
            setForm(editData);
        } else {
            setForm({
                description: "",
                amount: "",
                category: "",
                date: ""
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
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
            <div className="bg-white rounded-xl p-6 w-[450px]">
                <h2 className="text-2xl font-bold mb-6">
                    {editData ? "Edit Income" : "Add Income"}
                </h2>
                <div className="space-y-4">
                    <input
                        placeholder="Description"
                        className="w-full border rounded p-3"
                        value={form.description}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                description: e.target.value
                            })} />
                    <input
                        type="number"
                        placeholder="Amount"
                        className="w-full border rounded p-3"
                        value={form.amount}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                amount: e.target.value
                            })} />
                    <input
                        placeholder="Category"
                        className="w-full border rounded p-3"
                        value={form.category}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                category: e.target.value
                            })} />
                    <input
                        type="date"
                        className="w-full border rounded p-3"
                        value={form.date}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                date: e.target.value
                            })} />
                </div>
                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={onClose}
                        className="px-5 py-2 border rounded">
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="bg-[#e4d5bc] text-black px-5 py-2 rounded">
                        Save </button>
                </div>
            </div>
        </div>
    );
}