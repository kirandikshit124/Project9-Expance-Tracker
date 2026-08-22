import api from "./api";

export const getAllIncome = async () => {
    const res = await api.get("/income/get");
    return res.data;
};
export const addIncome = async (data) => {
    const res = await api.post("/income/add", data);
    return res.data;
};
export const updateIncome = async (id, data) => {
    const res = await api.put(`/income/update/${id}`, data);
    return res.data;
};
export const deleteIncome = async (id) => {
    const res = await api.delete(`/income/delete/${id}`);
    return res.data;
};
export const getIncomeOverview = async () => {
    const res = await api.get("/income/overview");
    return res.data.data;
};