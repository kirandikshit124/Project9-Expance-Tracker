import api from "./api";

export const getExpenses = async () => {
    const res = await api.get("/expense/get");
    return res.data;
};
export const addExpense = async (data) => {
    const res = await api.post("/expense/add", data);
    return res.data;
};
export const updateExpense = async (id, data) => {
    const res = await api.put(`/expense/update/${id}`, data);
    return res.data;
};
export const deleteExpense = async (id) => {
    const res = await api.delete(`/expense/delete/${id}`);
    return res.data;
};