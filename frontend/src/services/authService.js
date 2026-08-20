import api from "./api";

export const registerUser=async (data) => {
    const response=await api.post("/user/register", data);
    return response.data;
};

export const loginUser=async (data) => {
    const response=await api.post("/user/login", data);
    return response.data;
};