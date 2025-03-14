'use client';
import React, { useState } from "react";
import { Container, Box, Typography, CircularProgress } from "@mui/material";
import OrgLoginForm from "@/components/organisms/OrgLoginForm";
import loginUser from "@/apis/auth/auth";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { loginSuccess } from "@/store/slices/authSlice";
import { requestStart, requestSuccess, requestFailure, requestIdle } from "@/store/slices/statusSlice";
import { AppDispatch, RootState } from "@/store/store";

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>("ebudytest@gmail.com");
    const [password, setPassword] = useState<string>("asdw1234");
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { loading, error, success, message } = useSelector((state: RootState) => state.status);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(requestStart()); 
        const response = await loginUser(email, password);
        if (!response.error) {
            dispatch(requestSuccess()); 
            dispatch(loginSuccess(response.data.idToken));
            setTimeout(() => {
                router.push("/");
            }, 1000);
        } else {
            dispatch(requestFailure(response.error)); 
        }
        dispatch(requestIdle());
    };

    return (
        <Container maxWidth="xs">
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    mt: 8,
                    p: 3,
                    boxShadow: 3,
                    borderRadius: 2,
                    bgcolor: "background.paper",
                }}
            >
                <Typography variant="h5" component="h1" gutterBottom>
                    Login
                </Typography>
                <OrgLoginForm handleSubmit={handleSubmit} email={email} setEmail={setEmail} password={password} setPassword={setPassword} />
                {/* Show Status */}
                {loading && <CircularProgress />}
                {error && (
                    <Typography variant="body2" color="error">
                        {error}
                    </Typography>
                )}
                {success && (
                    <Typography variant="body2" color="success">
                        {message}
                    </Typography>
                )}
            </Box>
        </Container>
    );
};

export default LoginPage;
