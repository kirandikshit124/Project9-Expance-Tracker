import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import IncomeTable from "../components/IncomeTable";
import AddIncomeModal from "../components/AddIncomeModal";
import { getAllIncome, addIncome, updateIncome, deleteIncome } from "../services/incomeService";

export default function Income() {
    const [list, setList] = useState([]);
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(null);
    const load = async () => {
        const data = await getAllIncome();
        setList(data);
    };
    useEffect(() => {
        load();
    }, []);
    const save = async (form) => {
        try {
            if (edit) {
                await updateIncome(edit._id, form);
                toast.success("Income Updated");
            } else {
                await addIncome(form);
                toast.success("Income Added");
            }
            setOpen(false);
            setEdit(null);
            load();
        } catch {
            toast.error("Operation Failed");
        }
    };
    const remove = async (id) => {
        if (!window.confirm("Delete Income?")) return;
        await deleteIncome(id);
        toast.success("Income Deleted");
        load();
    };
    return (
        <div className="flex bg-slate-100 min-h-screen">
            <Sidebar />
            <div className="ml-64 flex-1">
                <Navbar />
                <div className="p-8">
                    <div className="flex justify-between mb-6">
                        <h1 className="text-3xl font-bold">
                            Income
                        </h1>
                        <button
                            onClick={() => {
                                setEdit(null);
                                setOpen(true);
                            }}
                            className="bg-[#e4d5bc] text-black px-5 py-2 rounded-lg">
                            + Add Income
                        </button>
                    </div>
                    <IncomeTable
                        data={list}
                        onEdit={(item) => {
                            setEdit(item);
                            setOpen(true);
                        }}
                        onDelete={remove}/>
                    <AddIncomeModal
                        open={open}
                        onClose={() => setOpen(false)}
                        onSubmit={save}
                        editData={edit}/>
                </div>
            </div>
        </div>
    );
}