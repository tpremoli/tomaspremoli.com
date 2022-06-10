import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Footer from './Footer';
import SelectionMenu from './SelectionMenu';
import PortfolioEntries from "./PortfolioEntries";


export default function Portfolio() {
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
                            Portfolio
                        </Typography>
                    </Container>
                </Box>

                <PortfolioEntries />

            </main>
            {/* Footer */}
            <Footer />
            {/* End footer */}
        </Container >
    );
}
