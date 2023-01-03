import React from 'react';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import useMediaQuery from '@mui/material/useMediaQuery';


export default function ButtonStacks() {
    const isminwidth = useMediaQuery("(max-width: 611px)")

    const links = {
        linkedin_link: "https://www.linkedin.com/in/tomas-premoli-008016144/",
        github_link: "https://github.com/tpremoli"
    };

    if (isminwidth) {
        return (
            <span>
                <Stack
                    sx={{ pt: 2, px: 0, mx: "auto", width: "90%" }}
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                    divider={< Divider orientation="vertical" flexItem />}
                >
                    <Button to="/resume" component={Link} variant="contained" sx={{ width: "50%" }}>
                        My Resume
                    </Button>
                    <Button color="linkedin" variant="contained" align="center" href={links.linkedin_link}
                        startIcon={<LinkedInIcon />} sx={{ width: "50%" }}
                    >
                        LinkedIn
                    </Button>
                </Stack >
                <Stack
                    sx={{ pt: 2, px: 0, mx: "auto", width: "90%" }}
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                    divider={< Divider orientation="vertical" flexItem />}
                >
                    <Button to="/contact-me" component={Link} variant="contained" sx={{ width: "50%" }}>
                        Contact Me
                    </Button>
                    <Button color="github" variant="contained" align="center" href={links.github_link}
                        startIcon={<GitHubIcon />} sx={{ width: "50%" }}
                    >
                        GitHub
                    </Button>
                </Stack >

            </span>
        )

    } else {
        return (
            <Stack
                sx={{ pt: 2, px: 0 }}
                direction="row"
                spacing={2}
                justifyContent="center"
                divider={< Divider orientation="vertical" flexItem />}
            >
                <Button to="/resume" component={Link} variant="contained">My Resume</Button>
                <Button to="/contact-me" component={Link} variant="contained">Contact Me</Button>
                <Button color="linkedin" variant="contained" align="center" href={links.linkedin_link} startIcon={<LinkedInIcon />}>
                    LinkedIn
                </Button>
                <Button color="github" variant="contained" align="center" href={links.github_link} startIcon={<GitHubIcon />}>
                    GitHub
                </Button>
            </Stack >
        )
    }
}