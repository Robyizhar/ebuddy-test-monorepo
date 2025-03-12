'use client';
import { TextField } from "@mui/material";

interface AtInputFieldProps {
    label: string;
    type?: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AtInputField: React.FC<AtInputFieldProps> = ({ label, type = "text", value, onChange }) => (
    <TextField
        fullWidth
        label={label}
        type={type}
        variant="outlined"
        margin="normal"
        value={value}
        onChange={onChange}
    />
);
