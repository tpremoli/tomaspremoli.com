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
            <Container sx={{ py: 8 }} maxWidth="md">
                <Grid container spacing={4}>
                    {[1, 2, 3, 4, 5, 6].map((entry) => (
                        <Grid item key={entry} xs={12} sm={6} md={4} width={300} height={200}>
                            <Skeleton
                                sx={{ height: '100%', width: '100%' }}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Container >
        );
    }

    console.log(portfolioEntries);

    return (
        <Container sx={{ py: 8 }} maxWidth="md">
            <Grid container spacing={4}>
                {portfolioEntries.map((entry) => (
                    <Grid item key={entry.id} xs={12} sm={6} md={4}>
                        <Card
                            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                        >
                            <CardMedia
                                component="img"
                                sx={{
                                    // 16:9
                                    // pt: '56.25%',
                                }}
                                image={entry.thumbnailpic}
                                alt="random"
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Heading
                                </Typography>
                                <Typography>
                                    This is a media card. You can use this section to describe the
                                    content.
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">View</Button>
                                <Button size="small">Edit</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container >
    );
}
