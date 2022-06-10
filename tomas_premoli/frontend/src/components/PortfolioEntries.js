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
import { Icon, IconButton } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import GitHubIcon from '@mui/icons-material/GitHub';
import PortfolioCard from './PortfolioCard';


export default function PortfolioEntries() {
    const [portfolioEntries, setPortfolioEntries] = useState({});
    const [isLoading, setLoading] = useState(true);

    const showCardHover = (index) => {
        setHoverIndex(index);
      }

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
                        <Grid item key={entry.id} xs={12} sm={6} md={4}>
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

    console.log(portfolioEntries);

    return (
        <Container sx={{ py: 8 }} maxWidth="xl">
            <Grid container spacing={4}>
                {portfolioEntries.map((entry) => (
                    <PortfolioCard entry={entry}/>
                ))}
            </Grid>
        </Container >
    );
}
