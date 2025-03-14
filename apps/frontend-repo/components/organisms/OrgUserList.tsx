'use client';

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { fetchUser, updateUserActivity } from "@/store/slices/userSlice";
import { Button, Box, Typography, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useRouter } from "next/navigation";

const OrgUserList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { users, loading, error } = useSelector((state: RootState) => state.user);
    const router = useRouter();
    
    const handBackClick = () => {
        router.push("/");
    };

    const handleUpdateClick = (userId: string) => {
        dispatch(updateUserActivity(userId));
    };

    const formatDate = (timestamp: number | null) => {
        if (timestamp !== null ) {
            return new Date(timestamp * 1000).toLocaleString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            });
        }
        return null;
    };

    return (
        <Box>
            <Box>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => dispatch(fetchUser())}
                    disabled={loading}
                    sx={{ marginRight: 2 }} 
                >
                    {loading ? <CircularProgress size={24} /> : "Fetch User"}
                </Button>

                <Button 
                    variant="contained" 
                    color="warning" 
                    onClick={() => handBackClick()}
                    disabled={loading}
                >
                    Home
                </Button>
            </Box>

            {loading && <Typography variant="body2">Loading...</Typography>}
            {error && <Typography variant="body2" color="error">{error}</Typography>}
            {users.length > 0 && (
                <TableContainer component={Paper} sx={{ mt: 2 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Total Average Weight Ratings</TableCell>
                                <TableCell>Number Of Rents</TableCell>
                                <TableCell>Recently Active</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user, index) => (
                                <TableRow key={index}>
                                    <TableCell>{user.userId}</TableCell>
                                    <TableCell>{user.totalAverageWeightRatings}</TableCell>
                                    <TableCell>{user.numberOfRents}</TableCell>
                                    <TableCell>{formatDate(user.recentlyActive)}</TableCell>
                                    <TableCell>
                                        <Button 
                                            variant="contained" 
                                            color="secondary" 
                                            onClick={() => handleUpdateClick(user.userId)}
                                            disabled={loading}
                                        >
                                            Update Recently Active
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
};

export default OrgUserList;
