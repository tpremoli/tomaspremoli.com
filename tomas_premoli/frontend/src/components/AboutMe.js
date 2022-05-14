import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Footer from './Footer';
import SelectionMenu from './SelectionMenu';


export default function AboutMe() {
    const [myData, setMyData] = useState({});
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        getAllNodes();
    }, []);

    const getAllNodes = () => {
        fetch("./api/my-data?format=json")
            .then(response => response.json())
            .then((data) => {
                setMyData(data);
                setLoading(false);
            });
    };

    if (isLoading) {
        return (
            <Box sx={{
                display: 'flex', alignItems: "center",
                justifyContent: "center", height: "100%", width: "100%",
            }}>
                <CircularProgress sx={{ display: 'flex', alignSelf: "center" }} />
            </Box >
        );
    }

    return (
        <Container disableGutters maxWidth={false}>
            <CssBaseline />
            {/* Header */}
            <SelectionMenu />
            {/* End Header */}
            <main>
                {/* Hero unit */}
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            About Me
                        </Typography>
                    </Container>
                </Box>

            </main>
            {/* Footer */}
            <Footer linkedin_link={myData.linkedin_link} github_link={myData.github_link} />
            {/* End footer */}
        </Container >
    );
}
