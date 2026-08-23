import api from "./api";

export const getExpenses = async () => {
    const res = await api.get("/expence/get");
    return res.data;
};
export const addExpense = async (data) => {
    const res = await api.post("/expence/add", data);
    return res.data;
};
export const updateExpense = async (id, data) => {
    const res = await api.put(`/expence/update/${id}`, data);
    return res.data;
};
export const deleteExpense = async (id) => {
    const res = await api.delete(`/expence/delete/${id}`);
    return res.data;
};