'use client'
import Button from '@mui/material/Button';

interface InputButtonProps {
    label: string;
    type?: "button" | "submit" | "reset";
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export function InputButton({ label, type = "submit", onClick }: InputButtonProps) {
    return (
        <Button type={type} onClick={onClick} fullWidth variant="contained" sx={{ mt: 2 }}>
            {label}
        </Button>
    );
}
