'use client';
import React, { useState } from "react";
import { Container, Box, Typography } from "@mui/material";
import OrgLoginForm from "@/components/organisms/OrgLoginForm";
import loginUser from "@/apis/auth/auth";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { loginSuccess } from "@/store/auth/AuthSlice";
import { AppDispatch } from "@/store/store";
import { Provider } from "react-redux";

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>("ebudytest@gmail.com");
    const [password, setPassword] = useState<string>("asdw1234");
    const dispatch = useDispatch<AppDispatch>();
    // const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const response = await loginUser(email, password);
        console.info("Login", response);
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
            </Box>
        </Container>
    );
};

export default LoginPage;
