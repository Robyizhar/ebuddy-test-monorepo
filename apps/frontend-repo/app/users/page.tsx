import { Container, Typography } from "@mui/material";
import OrgUserList from "@/components/organisms/OrgUserList";
// import { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useRouter } from "next/navigation";
// import { RootState } from "@/store/store";

const Home = () => {
    return (
        <Container>
            <Typography variant="h4">Welcome to Home Page</Typography>
            <OrgUserList />
        </Container>
    );
};

export default Home;
