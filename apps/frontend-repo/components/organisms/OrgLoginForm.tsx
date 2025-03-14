'use client'
import React from "react";
import { Box } from "@mui/material";
import { InputButton } from "@/components/atoms/InputButton";
import MolLoginFormFields from "@/components/molecules/MolLoginFormFields";

interface OrgLoginFormProps {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
}

const handleLoginClick = (event: React.MouseEvent<HTMLButtonElement>) => {
};


const OrgLoginForm: React.FC<OrgLoginFormProps> = ({ handleSubmit, email, setEmail, password, setPassword }) => (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
        <MolLoginFormFields email={email} setEmail={setEmail} password={password} setPassword={setPassword} />
        <InputButton label="Login" type="submit" onClick={(e) => { handleLoginClick(e) }} />
    </Box>
);

export default OrgLoginForm;
