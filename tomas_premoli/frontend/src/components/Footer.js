import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Icon, IconButton } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

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

export default function Footer(props) {
    return (
        < Box sx={{ bgcolor: 'background.paper', p: 6 }}
            component="footer" >
            <Typography variant="h6" align="center" gutterBottom>
                Footer
            </Typography>

            <IconButton
                align="center"
                href={props.linkedin_link}
            >
                <LinkedInIcon />
            </IconButton>

            <IconButton
                align="center"
                href={props.linkedin_link}
            >
                <GitHubIcon />
            </IconButton>

            <Typography
                variant="subtitle1"
                align="center"
                color="text.secondary"
                component="p"
            >

                Something here to give the footer a purpose!
            </Typography>
            <Copyright />
        </Box>
    );
}

