"use client";

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchUsers, updateUserActivityApi } from "@/apis/user/userApi";
import User from "@/apis/user/user";

interface UserState {
    users: User[] | [];
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    users: [],
    loading: false,
    error: null,
};

export const fetchUser = createAsyncThunk("user/fetchUser", async (_, { rejectWithValue }) => {
    try {
        const response = await fetchUsers();        
        if ("error" in response) {
            return rejectWithValue(response.error);
        }

        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Something went wrong!");
    }
});

export const updateUserActivity = createAsyncThunk("user/updateActivity", async (userId: string, { rejectWithValue }) => {
    try {
        const response = await updateUserActivityApi(userId);
        if ("error" in response) {
            return rejectWithValue(response.error);
        }
        return { userId, recentlyActive: response.data };
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<any>) => {
            state.users = action.payload;
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
                state.users = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateUserActivity.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(updateUserActivity.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUserActivity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setUser } = userSlice.actions; 
export default userSlice.reducer;
