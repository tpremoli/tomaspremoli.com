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
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Divider } from '@mui/material';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Footer from './Footer';
import SelectionMenu from './SelectionMenu';


export default function Experiences() {

    const myExperiences = [{
        name: "Amazon",
        title: "Software Development Engineer",
        description: "did SDE Stuff",
        startDate: "June 2022", endDate: "Present",
        location: "Barcelona, Spain",
    }, {
        name: "Amazon",
        title: "Software Development Engineer",
        description: "did SDE Stuff",
        startDate: "June 2022", endDate: "Present",
        location: "Barcelona, Spain",
    }, {
        name: "Amazon",
        title: "Software Development Engineer",
        description: "did SDE Stuff",
        startDate: "June 2022", endDate: "Present",
        location: "Barcelona, Spain",
    }];
    const myEducation = [{
        name: "University of Exeter",
        title: "MSci Computer Science",
        description: "List of stuff I did",
        startDate: "September 2020", endDate: "Present",
        location: "Exeter, England, United Kingdom",
    }, {
        name: "The American School of Barcelona",
        title: "International Baccalaureate Diploma",
        description: "List of stuff I did",
        startDate: "September 2018", endDate: "June 2020",
        location: "Barcelona, Spain",
    },];
    const mySkills = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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
                <Card
                    sx={{ height: '100%', p: "2%", m: "7px", flex: "1 1" }}
                >
                    <CardContent sx={{ flexGrow: 1, flexWrap: "nowrap" }}>
                        <Typography
                            sx={{ fontFamily: "Consolas" }}
                            gutterBottom variant="h4" component="h2">
                            Experiences
                            <WorkOutlineIcon
                                sx={{
                                    width: "36px",
                                    height: "36px",
                                    color: "black",
                                    verticalAlign: "middle",
                                    m: "3%"
                                }}
                            />
                        </Typography>
                    </CardContent>

                    <Divider />

                    {myExperiences.map((card) => (
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography gutterBottom variant="h5" component="h2">
                                {card.name}
                            </Typography>
                            <Typography gutterBottom component="h2">
                                {card.title}
                            </Typography>
                            <Typography>
                                {card.description}
                            </Typography>
                            <Typography sx={{ color: "gray" }}>
                                {card.startDate} - {card.endDate}
                            </Typography>
                            <Typography sx={{ color: "gray" }}>
                                {card.location}
                            </Typography>
                        </CardContent>
                    ))}
                    <CardActions>
                        <Button size="small">View</Button>
                        <Button size="small">Edit</Button>
                    </CardActions>
                </Card>

                <Card
                    sx={{ height: '100%', p: "2%", m: "7px", flex: "1 1" }}
                >
                    <CardContent sx={{ flexGrow: 1 }}>
                        <Typography
                            sx={{ fontFamily: "Consolas" }}
                            gutterBottom variant="h4" component="h2">
                            Education
                            <SchoolOutlinedIcon
                                sx={{
                                    width: "36px",
                                    height: "36px",
                                    color: "black",
                                    verticalAlign: "middle",
                                    m: "3%"
                                }}
                            />
                        </Typography>
                    </CardContent>

                    <Divider />

                    {myEducation.map((card) => (
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography gutterBottom variant="h5" component="h2">
                                {card.name}
                            </Typography>
                            <Typography gutterBottom component="h2">
                                {card.title}
                            </Typography>
                            <Typography>
                                {card.description}
                            </Typography>
                            <Typography sx={{ color: "gray" }}>
                                {card.startDate} - {card.endDate}
                            </Typography>
                            <Typography sx={{ color: "gray" }}>
                                {card.location}
                            </Typography>
                        </CardContent>
                    ))}
                    <CardActions>
                        <Button size="small">View</Button>
                        <Button size="small">Edit</Button>
                    </CardActions>
                </Card>


                <Card
                    sx={{ height: '100%', p: "2%", m: "7px", flex: "1 1" }}
                >
                    <CardContent sx={{ flexGrow: 1 }}>
                        <Typography
                            sx={{ fontFamily: "Consolas" }}
                            gutterBottom variant="h4" component="h2">
                            Skills
                            <SettingsOutlinedIcon
                                sx={{
                                    width: "36px",
                                    height: "36px",
                                    color: "black",
                                    verticalAlign: "middle",
                                    m: "3%"
                                }}
                            />
                        </Typography>
                    </CardContent>

                    <Divider />
                    {mySkills.map((card) => (
                        <CardContent >
                            <Typography gutterBottom variant="h5" component="h2">
                                Heading
                            </Typography>
                            <Typography>
                                This is a media card. You can use this section to describe the
                                content.
                            </Typography>
                        </CardContent>
                    ))}
                    <CardActions>
                        <Button size="small">View</Button>
                        <Button size="small">Edit</Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid >
    );
}
