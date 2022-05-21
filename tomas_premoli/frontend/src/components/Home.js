import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Footer from './Footer';
import SelectionMenu from './SelectionMenu';
import Experiences from './Experiences';


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
                    <Container maxWidth="lg">

                        <Box sx={{
                            textAlign: "center",
                        }}>
                            <img
                                style={{
                                    borderRadius: "50%",
                                    // width: "50%",
                                    maxWidth: "90%",
                                    height: "auto",
                                }}
                                alt="Me"
                                src="./api/media/me/pic.jpg">
                            </img>
                        </Box>
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
                            Hello! Welcome to my site.<br></br>
                            My name is Tomas Premoli and I am a Computer Science master's student and Software Developer.<br></br>
                            I love to code and I'm always happy to learn new things.<br></br>
                            Feel free to check out some of my <Link to="/portfolio">projects</Link>, and let me know what you think.<br></br>
                        </Typography>
                        {/* <Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            <Button href={"https://github.com/tpremoli"} variant="contained">My Github</Button>
                            <Button href={"https://www.linkedin.com/in/tomas-premoli-008016144/"} variant="outlined">My LinkedIn</Button>
                        </Stack> */}
                    </Container>
                </Box>

                <Experiences />

                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography variant="h5" align="center" paragraph>
                            Interested in my skill set? Reach out!
                        </Typography>
                        <Stack
                            sx={{ pt: 2 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            <Button to="/resume" component={Link} variant="contained">My Resume</Button>
                            <Button to="/contact-me" component={Link} variant="contained">Contact Me</Button>
                        </Stack>

                        <Typography spacing={2} sx={{ pt: 8 }} variant="h5" align="center" color="text.secondary" paragraph>
                            Not convinced? Check out my <Link to="/portfolio">Portfolio</Link>
                        </Typography>
                    </Container>
                </Box>

            </main>
            {/* Footer */}
            <Footer />
            {/* End footer */}
        </Container >
    );
}
