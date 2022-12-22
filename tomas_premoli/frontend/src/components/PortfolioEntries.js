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

    if (isLoading){
        return null;
    }

    // This could be placed all in main portfolio file

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
