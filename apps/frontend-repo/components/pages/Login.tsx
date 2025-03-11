'use client';
import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const Login: React.FC = () => {
const [inputValue1, setInputValue1] = useState<string>('');
const [inputValue2, setInputValue2] = useState<string>('');
const [error, setError] = useState<string>('');
const [result, setResult] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (Number(inputValue1) > 5 && Number(inputValue2) > 5) {
            setResult('Kondisi terpenuhi: Kedua input lebih besar dari 5');
            setError('');
        } else {
            setError('Kondisi tidak terpenuhi: Pastikan kedua input lebih besar dari 5');
            setResult('');
        }
    };

    return (
        <Box className="flex justify-center items-center h-screen">
            <Box
                className="p-8 rounded-lg shadow-lg w-80 bg-white"
                component="form"
                noValidate
                autoComplete="off"
            >
                <Typography variant="h5" gutterBottom>
                Login
                </Typography>
                <TextField
                label="Email"
                variant="outlined"
                fullWidth
                className="mb-4"
                />
                <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                className="mb-4"
                />
                <Button
                variant="contained"
                color="primary"
                fullWidth
                className="mt-4"
                >
                Login
                </Button>
            </Box>
        </Box>
    );


    // return (
    //     <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
    //     <Typography variant="h5" gutterBottom>
    //         Formulir Logika Sederhana
    //     </Typography>
    //     <form onSubmit={handleSubmit}>
    //         <TextField
    //             label="Input 1"
    //             variant="outlined"
    //             fullWidth
    //             value={inputValue1}
    //             onChange={(e) => setInputValue1(e.target.value)}
    //             margin="normal"
    //             type="number"
    //         />
    //         <TextField
    //             label="Input 2"
    //             variant="outlined"
    //             fullWidth
    //             value={inputValue2}
    //             onChange={(e) => setInputValue2(e.target.value)}
    //             margin="normal"
    //             type="number"
    //         />
    //         <Box sx={{ mt: 2 }}>
    //             <Button variant="contained" color="primary" type="submit" fullWidth>
    //                 Submit
    //             </Button>
    //         </Box>
    //     </form>

    //     {error && (
    //         <Typography color="error" variant="body2" sx={{ mt: 2 }}>
    //         {error}
    //         </Typography>
    //     )}

    //     {result && (
    //         <Typography color="primary" variant="body2" sx={{ mt: 2 }}>
    //         {result}
    //         </Typography>
    //     )}
    //     </Box>
    // );
};

export default Login;
