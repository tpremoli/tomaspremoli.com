import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Footer from './Footer';
import SelectionMenu from './SelectionMenu';


export default function Experiences() {
    const [myData, setMyData] = useState({});
    const [isLoading, setLoading] = useState(true);

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

    console.log(myData);

    return (
        <Grid container spacing={4}
            justifyContent="center"
            alignItems="center"
        >
            <Grid item sx={{
                display: 'flex',
                width: "90%",
                flexDirection: { xs: 'column', sm: 'row' }
            }}>
                <Card
                    sx={{ height: '100%', p: "2%", m: "7px" }}
                >
                    <CardMedia
                        component="img"
                        image="https://source.unsplash.com/random"
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
                <Card
                    sx={{ height: '100%', p: "2%", m: "7px" }}
                >
                    <CardMedia
                        component="img"
                        image="https://source.unsplash.com/random"
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
                <Card
                    sx={{ height: '100%', p: "2%", m: "7px" }}
                >
                    <CardMedia
                        component="img"
                        image="https://source.unsplash.com/random"
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
        </Grid>
    );
}
