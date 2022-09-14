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


export default function Resume() {
    const CV_URL = "/api/media/me/cv.pdf";
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
                        height: "1000px"
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
                            Resume/CV
                        </Typography>
                    </Container>

                    <Box sx={{ height: "100%", }}>
                        <center style={{ height: "100%", }}>
                            <iframe
                                src={"http://127.0.0.1:8000/static/PDFViewer/web/viewer.html?file=" + CV_URL}
                                type="application/pdf"
                                width="90%"
                                height="90%"
                            ></iframe>
                        </center>
                    </Box>
                </Box>
            </main>
            {/* Footer */}
            <Footer />
            {/* End footer */}
        </Container >
    );
}
