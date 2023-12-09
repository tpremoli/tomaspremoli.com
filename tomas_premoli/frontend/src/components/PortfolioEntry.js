import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Grid from '@mui/material/Grid';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { IconButton } from '@mui/material';
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
            getPDF();
        }
    }, [props.open]);
    const [pictures, setPictures] = useState([]);
    const [pdf, setPDF] = useState({});

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    var videoFileName = "";
    var videoMimeType = "";
    if (props.entry.video !== null) {
        videoFileName = props.entry.video;
        // Ideally this should be returned by python, but all my content will be mp4 anyways
        videoMimeType = "video/mp4";
    }

    const getPictures = () => {
        const req = "./api/portfolio-pictures?format=json&id=" + props.entry.id;
        fetch(req)
            .then(response => response.json())
            .then((data) => {
                setPictures(data);
            });
    };

    const getPDF = () => {
        const req = "./api/pdf?format=json&id=" + props.entry.pdf;
        fetch(req)
            .then(response => response.json())
            .then((data) => {
                setPDF(data);
            });
    }

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
                        alignitems: "center",
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

                <DialogContent sx={{ pb: 1, width: "100%" }}>
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
                            <source src={videoFileName} type={videoMimeType}></source>
                        </video>
                        : null}
                </DialogContent>
                <DialogContent sx={{ pt: 0, pb: 0 }}>
                    {props.entry.github_link !== "" &&
                        <Button href={props.entry.github_link} startIcon={<GitHubIcon />} sx={{ color: "black" }}>
                            Github Link
                        </Button>
                    }
                    {props.entry.link !== "" &&
                        <Button href={props.entry.link} startIcon={<LinkIcon />} sx={{ color: "green" }}>
                            Link to App
                        </Button>
                    }
                </DialogContent>
                {props.entry.pdf !== null ?
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: { xs: '500px', sm: '500px', md: '500px', lg: '600px'},
                    width: '100%', // Ensuring the container takes full width
                    margin: '0 auto', // Centering the container in case it's not full width
                    paddingBottom: 1,
                    boxSizing: 'border-box' // Include padding and border in the element's total width and height
                }}>
                    <DialogContent sx={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                    <iframe
                        id="pdf-js-viewer"
                        src={pdf ? pdf.pdf_url : null}
                        title={pdf ? pdf.name : "pdf"}
                        style={{ width: '100%', height: '100%', border: 'none' }} // Remove border
                    ></iframe>
                    </DialogContent>
                </Box>                : null}
                <DialogContent sx={{ pt: 0 }}>
                    <ReactMarkdown id="portfolio-entry-description"
                        tabIndex={-1}
                        gutterBottom
                    >{props.entry.description}</ReactMarkdown>
                </DialogContent>

                {pictures.length !== 0 ?
                    <span>
                        <Divider width="100%" mt={3} mb={3} />

                        <DialogContent alignitems="center" >

                            <DialogContentText
                                id="scroll-dialog-description"
                                ref={descriptionElementRef}
                                tabIndex={-1}
                                gutterBottom
                                variant="h4" component="h2" color="black"
                            >
                                Gallery
                            </DialogContentText>
                            {pictures.map((pic) => (
                                <Grid item key={"grid" + pic.id} xs={12} pb={3} align="center">
                                    <img
                                        style={{ maxWidth: "100%" }}
                                        src={pic.pic}
                                    />
                                </Grid>
                            ))}
                        </DialogContent >
                    </span>
                    : null}


                <Box
                    display="flex"
                    justifyContent="flex-end"
                    alignitems="flex-end"
                    sx={{ m: 1 }}
                >
                    {props.entry.github_link !== "" &&
                        <Button href={props.entry.github_link} startIcon={<GitHubIcon />} sx={{ color: "black" }}>
                            Github Link
                        </Button>
                    }
                    {props.entry.link !== "" &&
                        <Button href={props.entry.link} startIcon={<LinkIcon />} sx={{ color: "green" }}>
                            Link to App
                        </Button>
                    }
                </Box>
            </Dialog>
        </div >
    );
}