'use client'; // Tambahkan ini agar Redux Slice berjalan di client

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
    isAuthenticated: typeof window !== "undefined" ? !!localStorage.getItem("token") : false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            state.isAuthenticated = true;
            if (typeof window !== "undefined") {
                localStorage.setItem("token", action.payload);
            }
        },
        logout: (state) => {
            state.token = null;
            state.isAuthenticated = false;
            if (typeof window !== "undefined") {
                localStorage.removeItem("token");
            }
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
