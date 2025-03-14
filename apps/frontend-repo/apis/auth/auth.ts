import api from "@/utils/api";

async function loginUser(email: string, password: string) {
    try {
        return await api.post("/api/login", { email, password });
    } catch (error: any) {
        return error.response?.data || { error: "Terjadi kesalahan" };
    }
}

export default loginUser;