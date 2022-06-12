import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Container from '@mui/material/Container';
import PortfolioCard from './PortfolioCard';


export default function PortfolioEntries() {
    const [portfolioEntries, setPortfolioEntries] = useState({});
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

    if (isLoading) {
        return (
            <Container sx={{ py: 8 }} maxWidth="xl">
                <Grid container spacing={4}>
                    {[1, 2, 3, 4, 5, 6].map((entry) => (
                        <Grid item key={"loading"+entry} xs={12} sm={6} md={4}>
                            <Card
                                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                            >
                                <Skeleton
                                    sx={{ height: '450px', width: '300px' }}
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        <Skeleton />
                                    </Typography>
                                    <Typography>
                                        <Skeleton />
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">
                                        <Skeleton />
                                    </Button>
                                    <Button size="small">
                                        <Skeleton />
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>

                    ))}
                </Grid>
            </Container >
        );
    }

    return (
        <Container sx={{ py: 8 }} maxWidth="xl">
            <Grid container spacing={4}>
                {portfolioEntries.map((entry) => (
                    <PortfolioCard entry={entry} key={entry.id.toString()} />
                ))}
            </Grid>
        </Container >
    );
}
