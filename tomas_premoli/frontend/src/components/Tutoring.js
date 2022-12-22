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
                        <Container sx={{ py: 8, maxWidth: { xs: "95%", sm: '80%', md: '70%' } }} >
                            <Grid container spacing={4}>
                                <Grid item xs={12} sm={12} md={6}>
                                    <ReactMarkdown gutterBottom >
                                        {tutoring.blurb}
                                    </ReactMarkdown>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6}>
                                    <img
                                        style={{
                                            width: "100%"
                                        }}
                                        src={tutoring.pic}>
                                    </img>
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
                </Box>
            </main>
            {/* Footer */}
            <Footer />
            {/* End footer */}
        </Container >
    );
}
