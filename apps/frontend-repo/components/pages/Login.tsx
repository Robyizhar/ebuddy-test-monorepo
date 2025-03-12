'use client';
import React, { useState } from "react";
import { Container, Box, Typography } from "@mui/material";
import OrgLoginForm from "@/components/organisms/OrgLoginForm";

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Email:", email, "Password:", password);
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
