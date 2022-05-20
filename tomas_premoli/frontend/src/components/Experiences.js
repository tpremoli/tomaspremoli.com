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
    const [EES, setEES] = useState({});
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        getAllNodes();
    }, []);

    const getAllNodes = () => {
        fetch("./api/get-ees?format=json")
            .then(response => response.json())
            .then((data) => {
                setEES(data);
                setLoading(false);
            });
    };

    if (isLoading) {
        return (
            <Grid container spacing={4}
                justifyContent="center"
                alignItems="center"
            >
                <Box sx={{
                    display: 'flex', alignItems: "center",
                    justifyContent: "center", height: "100%", width: "100%",
                }}>
                    <CircularProgress sx={{ display: 'flex', alignSelf: "center" }} />
                </Box>
            </Grid>
        );
    }

    const myExperiences = EES.experiences;
    const myEducation = EES.education;
    const mySkills = EES.skills;

    // INCLUDE LOADING OF DATA FROM DB

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

                    {myExperiences.map((experience) => (
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography gutterBottom variant="h5" component="h2">
                                {experience.name}
                            </Typography>
                            <Typography gutterBottom component="h2">
                                {experience.title}
                            </Typography>
                            <Typography>
                                {experience.description}
                            </Typography>
                            <Typography sx={{ color: "gray" }}>
                                {experience.start_date} - {experience.end_date} • {experience.duration}
                            </Typography>
                            <Typography sx={{ color: "gray" }}>
                                {experience.location}
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

                    {myEducation.map((education) => (
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography gutterBottom variant="h5" component="h2">
                                {education.name}
                            </Typography>
                            <Typography gutterBottom component="h2">
                                {education.title}
                            </Typography>
                            <Typography>
                                {education.description}
                            </Typography>
                            <Typography sx={{ color: "gray" }}>
                                {education.start_year} - {education.end_year}
                            </Typography>
                            <Typography sx={{ color: "gray" }}>
                                {education.location}
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
                    {mySkills.map((skill) => (
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography gutterBottom variant="h5" component="h2">
                                {skill.name}
                            </Typography>
                            <Typography>
                                {skill.description}
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
