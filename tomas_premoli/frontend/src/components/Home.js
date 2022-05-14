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


export default function Home() {
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

    console.log(myData);

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
                            Tomas Premoli
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            Hello!
                            Something about my name is Tomas Premoli and what i do.
                            Add a funky pic of me to the right here.
                            Format to allow for newlines.
                        </Typography>
                        <Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            <Button href={myData.github_link} variant="contained">My Github</Button>
                            <Button href={myData.linkedin_link} variant="outlined">My LinkedIn</Button>
                        </Stack>
                    </Container>
                </Box>

            </main>
            {/* Footer */}
            <Footer linkedin_link={myData.linkedin_link} github_link={myData.github_link} />
            {/* End footer */}
        </Container >
    );
}
