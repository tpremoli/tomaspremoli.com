import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Divider } from '@mui/material';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Footer from './Footer';
import SelectionMenu from './SelectionMenu';


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
            <Grid container spacing={4}
                justifyContent="center"
                alignItems="center"
            >
                <Grid item sx={{
                    display: 'flex',
                    width: "90%",
                    flexDirection: { xs: "column", sm: 'column', md: 'row' }
                }}>

                </Grid>
            </Grid >
        );
    }

    console.log(portfolioEntries);

    return (
        <Grid container spacing={4}
            justifyContent="center"
            alignItems="center"
        >
            <Grid item sx={{
                display: 'flex',
                width: "90%",
                flexDirection: { xs: "column", sm: 'column', md: 'row' }
            }}>
                <Skeleton />
                <Skeleton />
            </Grid>
        </Grid >
    );
}
