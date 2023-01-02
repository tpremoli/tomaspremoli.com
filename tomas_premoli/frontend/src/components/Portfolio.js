import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import PortfolioCard from './PortfolioCard';
import Footer from './Footer';
import SelectionMenu from './SelectionMenu';


export default function Portfolio() {

    const [portfolioEntries, setPortfolioEntries] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        getAllNodes();
    }, []);

    const getAllNodes = () => {
        fetch("./api/portfolio-entries?format=json")
            .then(response => response.json())
            .then((data) => {
                setPortfolioEntries(data);
                setLoading(false);
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

                <Container sx={{ py: 8 }} maxWidth="xl">
                    <Grid container spacing={4}>
                        {portfolioEntries !== {} ? portfolioEntries.map((entry) => (
                            <PortfolioCard entry={entry} key={entry.id.toString()} />
                        )) : null}
                    </Grid>
                </Container >

            </main>
            {/* Footer */}
            <Footer />
            {/* End footer */}
        </Container >
    );
}
