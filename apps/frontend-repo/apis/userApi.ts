import User from "./user";
export const fetchUsers = async () => {
    const response = await fetch("/api/users");
    if (!response.ok) throw new Error("Failed to fetch users");
    return response.json();
};

export const updateUser = async (userId: string, user: User) => {
    const response = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    });
    if (!response.ok) throw new Error("Failed to update user");
    return response.json();
};