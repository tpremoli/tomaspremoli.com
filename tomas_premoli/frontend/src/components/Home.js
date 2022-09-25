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
    return (
        <Container disableGutters maxWidth={false}>
            <CssBaseline />
            {/* Header */}
            <SelectionMenu />
            {/* End Header */}
            <main>
                {/* Hero unit */}
                <Box sx={{
                    width: "100vw", height: "20rem", m: "auto"
                }}>
                    <img
                        style={{
                            width: "100%", height: "20rem", objectFit: "cover"
                        }}
                        src="./media/me/banner.jpg">
                    </img>
                </Box>

                <Container width="100%" disableGutters sx={{
                    bgcolor: 'background.paper',
                    pb: 6,
                }}>

                    <Box sx={{
                        textAlign: "center", mt: "-14rem"
                    }}>
                        <img
                            style={{
                                borderRadius: "50%",
                                // width: "50%",
                                maxWidth: "90%",
                                height: "auto",
                            }}
                            alt="Me"
                            src="./media/me/pic.jpg">
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
                    <Typography variant="h5" align="center" color="text.secondary" paragraph sx={{ pl: "3vw", pr: "3vw" }}>
                        Hello! Welcome to my site.<br></br>
                        My name is Tomas Premoli and I am a Computer Science master's student and Software Developer.<br></br>
                        I love to code and I'm always happy to learn new things.<br></br>
                        Feel free to check out some of my <Link to="/portfolio">projects</Link>, and let me know what you think.<br></br>
                    </Typography>
                </Container>

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
