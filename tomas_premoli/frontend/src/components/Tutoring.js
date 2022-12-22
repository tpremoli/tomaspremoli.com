import React, { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Footer from './Footer';
import SelectionMenu from './SelectionMenu';
import ReactMarkdown from 'react-markdown'


export default function Tutoring() {
    useEffect(() => {
        getAllNodes();
    }, []);

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
                        <Grid container
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Grid item sx={{
                                display: 'flex',
                                width: "90%",
                                flexWrap: "wrap"
                            }}>
                                <Card
                                    sx={{ height: '100%', p: "2%", m: "7px", flex: "1 1", minWidth: "30%" }}
                                >
                                    <CardContent sx={{ flexGrow: 1, flexWrap: "wrap" }}>
                                        <ReactMarkdown gutterBottom>
                                            {tutoring.blurb}
                                        </ReactMarkdown>
                                    </CardContent>
                                </Card>
                                <Card
                                    sx={{ height: '100%', p: "2%", m: "7px", flex: "1 1", minWidth: "30%" }}
                                >
                                    <CardMedia
                                        component="img"
                                        image={tutoring.pic}
                                    />
                                </Card>
                                <Card
                                    sx={{ height: '100%', p: "2%", m: "7px", flex: "1 1", minWidth: "30%" }}
                                >
                                    <CardContent sx={{ flexGrow: 1, flexWrap: "wrap" }}>
                                        {tutoring.skills}
                                    </CardContent>
                                </Card>
                                <Card
                                    sx={{ height: '100%', p: "2%", m: "7px", flex: "1 1", minWidth: "30%" }}
                                >
                                    <CardContent sx={{ flexGrow: 1, flexWrap: "wrap" }}>
                                        {tutoring.classes}
                                    </CardContent>
                                </Card>

                            </Grid>
                        </Grid >
                    }
                </Box>
            </main>
            {/* Footer */}
            <Footer />
            {/* End footer */}
        </Container >
    );
}
