"use client";

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchUsers } from "@/apis/user/userApi";

interface UserState {
    user: any | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
};

export const fetchUser = createAsyncThunk("user/fetchUser", async (_, { rejectWithValue }) => {
    try {
        const response = await fetchUsers();

        if ("error" in response) {
            return rejectWithValue(response.error);
        }

        return response;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Something went wrong!");
    }
});

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<any>) => {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setUser } = userSlice.actions; 
export default userSlice.reducer;
