import api from "./api";

export const getDashboard = async (range = "monthly") => {
    const res = await api.get("/dashboard", { params: { range }});
    return res.data.data;
};