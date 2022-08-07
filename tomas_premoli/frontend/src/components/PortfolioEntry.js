import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Icon, IconButton, Typography } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import CloseIcon from '@mui/icons-material/Close';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useTheme } from '@mui/material/styles';
import { Divider } from '@mui/material';
import ReactMarkdown from 'react-markdown'

export default function PortfolioEntry(props) {
    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (props.open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
            getPictures();
        }
    }, [props.open]);
    const [pictures, setPictures] = useState([]);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    var videoFileName = "";
    var videoFileType = "";
    if (props.entry.video !== null) {
        videoFileName = props.entry.video;
        console.log(props.entry);
        const split = videoFileName.split(".");
        videoFileType = split[split.length - 1];
    }

    const getPictures = () => {
        const req = "./api/portfolio-pictures?format=json&?id=" + props.entry.id;
        fetch(req)
            .then(response => response.json())
            .then((data) => {
                setPictures(data);
            });
    };


    return (
        <div>
            <Dialog
                maxWidth="md"
                fullScreen={fullScreen}
                open={props.open}
                onClose={() => { props.setOpen(false) }}
                scroll="body"
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title"
                    variant="h3" component="h3" color="black" sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    {props.entry.title}
                    <IconButton onClick={() => { props.setOpen(false) }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <Divider />

                {/* Top is video */}
                {/* Then is quick links (github, link to use) */}
                {/* Then is thorough description (MARKDOWN SUPPORT) */}
                {/* Then is screenshots (https://mui.com/material-ui/react-image-list/) */}
                {/* Then is button links (github, link to use) */}

                <DialogContent sx={{ pb: 1 }}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                        gutterBottom
                        variant="h6" component="h2" color="black"

                    >
                        {props.entry.blurb}

                    </DialogContentText>

                    {props.entry.video !== null ?
                        <video width="100%" height="auto" controls>
                            <source src={videoFileName} type={"video/" + videoFileType}></source>
                        </video>
                        : null}
                </DialogContent>
                <DialogContent sx={{ pt: 0, pb: 0 }}>
                    <IconButton href={props.entry.github_link}>
                        <GitHubIcon sx={{ color: "black" }} />
                    </IconButton>
                    {props.entry.link !== "" &&
                        <IconButton href={props.entry.link} >
                            <LinkIcon sx={{ color: "black" }} />
                        </IconButton>
                    }
                </DialogContent>
                <DialogContent sx={{ pt: 0 }}>
                    <ReactMarkdown id="portfolio-entry-description"
                        tabIndex={-1}
                        gutterBottom
                    >{props.entry.description}</ReactMarkdown>
                </DialogContent>



                <Box
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="flex-end"
                    sx={{ m: 1 }}
                >
                    <IconButton href={props.entry.github_link}>
                        <GitHubIcon sx={{ color: "black" }} />
                    </IconButton>
                    {props.entry.link !== "" &&
                        <IconButton href={props.entry.link} >
                            <LinkIcon sx={{ color: "black" }} />
                        </IconButton>
                    }
                </Box>
            </Dialog>
        </div >
    );
}