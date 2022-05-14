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
    const [myData, setMyData] = useState({});
    const [isLoading, setLoading] = useState(true);
    const CV_URL = "/api/media/me/cv.pdf";

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
                            Resume/CV
                        </Typography>
                    </Container>

                    <center>
                        <iframe
                            src={"http://127.0.0.1:8000/static/PDFViewer/web/viewer.html?file=" + CV_URL}
                            type="application/pdf"
                            width="90%"
                            height="600px"
                            sx={{
                                align: "center",
                            }}
                        ></iframe>
                    </center>
                </Box>
            </main>
            {/* Footer */}
            <Footer linkedin_link={myData.linkedin_link} github_link={myData.github_link} />
            {/* End footer */}
        </Container >
    );
}
