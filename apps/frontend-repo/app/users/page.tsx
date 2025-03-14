'use client';

import { Container, Typography } from "@mui/material";
import OrgUserList from "@/components/organisms/OrgUserList";

const Home = () => {
    return (
        <Container>
            <Typography variant="h4">Welcome to Home Page</Typography>
            <OrgUserList />
        </Container>
    );
};

export default Home;
