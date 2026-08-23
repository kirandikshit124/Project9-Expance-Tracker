import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ExpenseTable from "../components/ExpenseTable";
import AddExpenseModal from "../components/AddExpenseModal";
import { getExpenses, addExpense, updateExpense, deleteExpense } from "../services/expenseService";

export default function Expense() {
    const [expenses, setExpenses] = useState([]);
    const [open, setOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const fetchExpenses = async () => {
        try {
            const data = await getExpenses();
            setExpenses(data);
        } catch {
            toast.error("Unable to fetch expenses");
        }
    };
    useEffect(() => {
        fetchExpenses();
    }, []);
    const handleSave = async (form) => {
        try {
            if (editData) {
                await updateExpense(editData._id, form);
                toast.success("Expense Updated");
            } else {
                await addExpense(form);
                toast.success("Expense Added");
            }
            setOpen(false);
            setEditData(null);
            fetchExpenses();
        } catch {
            toast.error("Operation Failed");
        }
    };
    const handleDelete = async (id) => {
        if (!window.confirm("Delete this expense?")) return;
        try {
            await deleteExpense(id);
            toast.success("Expense Deleted");
            fetchExpenses();
        } catch {
            toast.error("Delete Failed");
        }
    };
    return (
        <div className="flex bg-[#e8e4e1] min-h-screen">
            <Sidebar />
            <div className="ml-64 flex-1">
                <Navbar />
                <div className="p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold">
                            Expenses
                        </h1>
                        <button
                            onClick={() => {
                                setEditData(null);
                                setOpen(true);
                            }}
                            className="bg-[#6B4E3D] text-white px-5 py-2 rounded-lg">
                            + Add Expense
                        </button>
                    </div>
                    <ExpenseTable
                        data={expenses}
                        onEdit={(item) => {
                            setEditData(item);
                            setOpen(true);
                        }}
                        onDelete={handleDelete} />
                    <AddExpenseModal
                        open={open}
                        onClose={() => setOpen(false)}
                        onSubmit={handleSave}
                        editData={editData} />
                </div>
            </div>
        </div>
    );
}