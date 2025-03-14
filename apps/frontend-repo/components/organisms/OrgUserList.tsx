'use client';

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { fetchUser } from "@/store/slices/userSlice";
import { Button, Box, Typography, CircularProgress } from "@mui/material";

const OrgUserList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user, loading, error } = useSelector((state: RootState) => state.user);

    return (
        <Box>
            <Button 
                variant="contained" 
                color="primary" 
                onClick={() => dispatch(fetchUser())}
                disabled={loading}
            >
                {loading ? <CircularProgress size={24} /> : "Fetch User"}
            </Button>

            {loading && <Typography variant="body2">Loading...</Typography>}
            {error && <Typography variant="body2" color="error">{error}</Typography>}
            {user && (
                <Box mt={2}>
                    <Typography variant="h6">User Info</Typography>
                    <Typography>Name: {user.name}</Typography>
                    <Typography>Email: {user.email}</Typography>
                </Box>
            )}
        </Box>
    );
};

export default OrgUserList;
