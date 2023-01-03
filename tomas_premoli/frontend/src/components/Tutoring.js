import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import Container from '@mui/material/Container';
import Footer from './Footer';
import SelectionMenu from './SelectionMenu';
import ReactMarkdown from 'react-markdown'


export default function Tutoring() {
    useEffect(() => {
        getAllNodes();
    }, []);

    const links = {
        linkedin_link: "https://www.linkedin.com/in/tomas-premoli-008016144/",
        github_link: "https://github.com/tpremoli"
    };

    const [tutoring, setTutoring] = React.useState({});

    const getAllNodes = () => {
        fetch("./api/tutoring-data?format=json")
            .then(response => response.json())
            .then((data) => {
                setTutoring(data);
            });
    };


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
                        alignItems: "center",
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
                            Tutoring
                        </Typography>
                    </Container>

                    {tutoring == {} ? null :
                        <Container sx={{ py: 8, maxWidth: { xs: "95%", sm: '80%', md: '70%' } }} >
                            <Grid container spacing={4}>
                                <Grid item xs={12} sm={12} md={6}>
                                    <center><img
                                        style={{
                                            width: "90%",
                                            align: "center",
                                            borderRadius: "5px"
                                        }}
                                        className="default-shadow"
                                        src={tutoring.pic}>
                                    </img></center>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6}>
                                    <ReactMarkdown gutterBottom >
                                        {tutoring.blurb}
                                    </ReactMarkdown>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6}>
                                    <ReactMarkdown gutterBottom>
                                        {tutoring.skills}
                                    </ReactMarkdown>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6}>
                                    <ReactMarkdown gutterBottom >
                                        {tutoring.classes}
                                    </ReactMarkdown>
                                </Grid>
                            </Grid>
                        </Container >
                    }

                    <Container maxWidth="sm">
                        <Typography variant="h5" align="center" paragraph>
                            In essence, I have experience and knowledge in many fields and I'm always happy to help!
                        </Typography>
                        <Typography variant="h5" align="center" paragraph>
                            If you'd like to consult with me, feel free to reach out below, or at my email <a href="mailto:tomas@premoli.org">tomas@premoli.org</a>
                        </Typography>
                        <Stack
                            sx={{ pt: 2 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            <Button to="/resume" component={Link} variant="contained">My Resume</Button>
                            <Button to="/contact-me" component={Link} variant="contained">Contact Me</Button>
                            <Button color="linkedin" variant="contained" align="center" href={links.linkedin_link} startIcon={<LinkedInIcon />}>
                                LinkedIn
                            </Button>
                            <Button color="github" variant="contained" align="center" href={links.github_link} startIcon={<GitHubIcon />}>
                                GitHub
                            </Button>
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
