import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Icon, IconButton } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Divider } from '@mui/material';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="http://tomaspremoli.com/">
                Tomas Premoli
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function Footer() {
    const myData = {
        linkedin_link: "https://www.linkedin.com/in/tomas-premoli-008016144/",
        github_link: "https://github.com/tpremoli"
    };

    return (
        < Box sx={{ bgcolor: 'background.paper', p: 6, pl: 0, pr: 0 }}
            component="footer"  >
            <Divider />
            <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={0}
                justifyContent="center"
            >
                <IconButton align="center" href={myData.linkedin_link}>
                    <LinkedInIcon />
                </IconButton>

                <IconButton align="center" href={myData.github_link}>
                    <GitHubIcon />
                </IconButton>
            </Stack>

            <Typography
                variant="subtitle1"
                align="center"
                color="text.secondary"
                component="p"
            >
                I made this site!
            </Typography>
            <Copyright />
        </Box>
    );
}

