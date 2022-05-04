import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import TPSVG from './Logo'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Footer from './Footer';
import { Link } from "react-router-dom";

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Home() {
    return (
        <Container disableGutters maxWidth={false}>
            <CssBaseline />
            <AppBar position="relative" sx={{ flexDirection: "column", flexWrap: "wrap" }} >
                <Toolbar disableGutters>
                    <Box sx={{ align: "flex-start", flex: 1 }}>
                        <TPSVG width={"36px"} height={"36px"} m={"5px"} ml={"15px"} mr={"10px"} />
                    </Box>

                    <Typography variant="h6" color="inherit" noWrap>
                    </Typography>

                    <Box style={{
                        textAlign: "center",
                        display: "flex",
                        flexWrap: "wrap",
                    }}>
                        <Button color="primary" variant="filled" to="/about-me" component={Link}>
                            About Me
                        </Button>
                        <Button color="primary" variant="filled" to="/portfolio" component={Link}>
                            Portfolio
                        </Button>
                        <Button color="primary" variant="filled" to="/resume" component={Link}>
                            Resume/CV
                        </Button>
                        <Button color="primary" variant="filled" to="/contact-me" component={Link}>
                            Contact Me
                        </Button>
                    </Box>

                    <Box sx={{ align: "flex-start", flex: 1 }}>
                    </Box>
                </Toolbar>
            </AppBar>
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
                            <Button variant="contained">Main call to action</Button>
                            <Button variant="outlined">Secondary action</Button>
                        </Stack>
                    </Container>
                </Box>
                <Container sx={{ py: 8 }} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {cards.map((card) => (
                            <Grid item key={card} xs={12} sm={6} md={4}>
                                <Card
                                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                >
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            // 16:9
                                            pt: '56.25%',
                                        }}
                                        image="https://source.unsplash.com/random"
                                        alt="random"
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Heading
                                        </Typography>
                                        <Typography>
                                            This is a media card. You can use this section to describe the
                                            content.
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small">View</Button>
                                        <Button size="small">Edit</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
            {/* Footer */}
            <Footer />
            {/* End footer */}
        </Container >
    );
}
