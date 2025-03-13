import api from "@/utils/api";

async function loginUser(email: string, password: string) {
    try {
        const response = await api.post("/api/login", { email, password });
        return response.data;
    } catch (error: any) {
        return error.response?.data || { error: "Terjadi kesalahan" };
    }
}

export default loginUser;