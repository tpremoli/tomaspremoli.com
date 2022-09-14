import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Container, Divider } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import ReactMarkdown from 'react-markdown'


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
        <Grid container 
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
                        <CardContent sx={{ flexGrow: 1 }} key={"exp" + experience.id}>
                            <Typography gutterBottom variant="h5" component="h2" key={"expname" + experience.id}>
                                {experience.name}
                            </Typography>
                            <Typography gutterBottom component="h2" key={"exptitle" + experience.id}>
                                {experience.title}
                            </Typography>
                            <ReactMarkdown
                                key={"expdesc" + experience.id}
                                tabIndex={-1}
                                gutterBottom
                                className="compactMD"
                            >
                                {experience.description}
                            </ReactMarkdown>
                            <Typography sx={{ color: "gray" }} key={"expdate" + experience.id}>
                                {experience.start_date} - {experience.end_date}
                            </Typography>
                            <Typography sx={{ color: "gray" }} key={"exploc" + experience.id}>
                                {experience.location}
                            </Typography>
                        </CardContent>
                    ))}
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
                        <CardContent sx={{ flexGrow: 1 }} key={"edu" + education.id}>
                            <Typography gutterBottom variant="h5" component="h2" key={"eduname" + education.id}>
                                {education.name}
                            </Typography>
                            <Typography gutterBottom component="h2" key={"edutitle" + education.id}>
                                {education.title}
                            </Typography>
                            <ReactMarkdown
                                key={"edudesc" + education.id}
                                tabIndex={-1}
                                gutterBottom
                                className="compactMD"
                            >
                                {education.description}
                            </ReactMarkdown>
                            <Typography sx={{ color: "gray" }} key={"eduyear" + education.id}>
                                {education.start_year} - {education.end_year}
                            </Typography>
                            <Typography sx={{ color: "gray" }} key={"eduloc" + education.id}>
                                {education.location}
                            </Typography>
                        </CardContent>
                    ))}
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
                        <CardContent sx={{ flexGrow: 1 }} key={"skill" + skill.id}>
                            <Typography gutterBottom variant="h5" component="h2" key={"skillname" + skill.id}>
                                {skill.name}
                            </Typography>
                            <ReactMarkdown
                                key={"skilldesc" + skill.id}
                                tabIndex={-1}
                                gutterBottom
                                className="compactMD"
                            >
                                {skill.description}
                            </ReactMarkdown>
                        </CardContent>
                    ))}
                </Card>
            </Grid>
        </Grid >
    );
}
