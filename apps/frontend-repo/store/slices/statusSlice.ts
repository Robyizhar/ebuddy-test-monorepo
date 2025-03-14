import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StatusState {
    loading: boolean;
    error: string | null;
    success: boolean;
    message: string;
}

const initialState: StatusState = {
    loading: false,
    error: null,
    success: false,
    message: '',
};

const statusSlice = createSlice({
    name: "status",
    initialState,
    reducers: {
        requestStart: (state) => {
            state.loading = true;
            state.success = false;
            state.error = null;
            state.message = 'Loading...';
        },
        requestSuccess: (state) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.message = 'Success!';
        },
        requestFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
            state.message = 'Error!';
        },
        requestIdle: (state) => {
            state.loading = false;
            state.success = false;
            state.error = null;
            state.message = '';
        },
    },
});

export const { requestStart, requestSuccess, requestFailure, requestIdle } = statusSlice.actions;
export default statusSlice.reducer;
