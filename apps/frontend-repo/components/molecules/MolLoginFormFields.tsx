'use client'
import React from "react";
import {AtInputField} from "@/components/atoms/AtInputField";

interface MolLoginFormFieldsProps {
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
}

const MolLoginFormFields: React.FC<MolLoginFormFieldsProps> = ({ email, setEmail, password, setPassword }) => (
    <>
        <AtInputField 
            label="Email" 
            value={email} 
            onChange={(e: { target: { value: string; }; }) => setEmail(e.target.value)} 
        />
        <AtInputField 
            label="Password" 
            type="password" 
            value={password} 
            onChange={(e: { target: { value: string; }; }) => setPassword(e.target.value)} 
        />
    </>
);

export default MolLoginFormFields;
