import User from "./user";
import api from "@/utils/api";

export const fetchUsers = async () => {
    try {
        return await api.get("/api/fetch-user-data");
    } catch (error: any) {
        return error.response?.data || { error: "Something went wrong!" };
    }
};

export const updateUserActivityApi = async (userId: string) => {
    try {
        return await api.post("/api/update-user-data", { userId });
    } catch (error: any) {
        return error.response?.data || { error: "Something went wrong!" };
    }
};
