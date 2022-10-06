import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Footer from './Footer';
import SelectionMenu from './SelectionMenu';

export default function Resume() {
    const [myData, setMyData] = useState({});

    useEffect(() => {
        getAllNodes();
    }, []);

    const getAllNodes = () => {
        fetch("./api/my-data?format=json")
            .then(response => response.json())
            .then((data) => {
                setMyData(data);
            });
    };

    var encodedUrl = "";
    if (myData != null) {
        encodedUrl = `./static/PDFjs/web/viewer.html?file=${encodeURIComponent(myData.cv)}`;
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
                            <iframe id="pdf-js-viewer"
                                src={encodedUrl ? encodedUrl : null}
                                title="my-cv"
                                frameBorder="0"
                                width="90%"
                                height="90%">
                            </iframe>
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
