import User from "./user";
import api from "@/utils/api";

export const fetchUsers = async () => {
    try {
        return await api.get("/api/fetch-user-data");
    } catch (error: any) {
        return error.response?.data || { error: "Something went wrong!" };
    }
};