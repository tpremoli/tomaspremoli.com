// React MUI card that reveals data when mouse hovers over
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


export default function PortfolioCard(props) {
    const [isHovering, setHovering] = React.useState(false);
    return (
        <Grid item key={props.entry.id} xs={12} sm={6} md={4}>
            <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
                <CardMedia
                    component="img"
                    image={props.entry.thumbnailpic}
                    alt="random"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.entry.title}
                    </Typography>
                    <Typography>
                        {props.entry.blurb}
                    </Typography>
                </CardContent>
                <CardActions>
                    <IconButton align="center" href={props.entry.github_link}>
                        <GitHubIcon />
                    </IconButton>
                    {props.entry.link !== "" &&
                        <IconButton align="center" href={props.entry.link}>
                            <LinkIcon />
                        </IconButton>
                    }
                </CardActions>
            </Card>
            {/* Card that has information appear on mouseover */}
        </Grid>
    );
}