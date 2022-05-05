import * as React from 'react';
import TPSVG from './Logo'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';

const navigationLinks = [
    { name: "About Me", to: "/about-me" },
    { name: "Portfolio", to: "/portfolio" },
    { name: "Resume/CV", to: "/resume" },
    { name: "Contact Me", to: "/contact-me" },
]

export default function SelectionMenu() {
    return (

        <AppBar position="relative" sx={{ flexDirection: "column", flexWrap: "wrap" }} >
            <Toolbar disableGutters>
                <Box sx={{ align: "flex-start", flex: 1 }}>
                    <TPSVG width={"36px"} height={"36px"} m={"15px"} mb={"7px"} />
                </Box>

                <Typography variant="h6" color="inherit" noWrap>
                </Typography>
                <Box sx={{ display: { xs: 'none', sm: 'flex' } }}
                    style={{
                        textAlign: "center",
                        // display: "flex",
                        flexWrap: "wrap",
                    }}>
                    {navigationLinks.map((item) => (
                        <Button color="primary" variant="filled" to={item.to} component={Link}>
                            {item.name}
                        </Button>
                    ))}
                </Box>

                <Box sx={{ align: "flex-start", flex: 1, display: 'flex' }}>

                </Box>
                <IconButton
                    sx={{
                        display: { xs: 'flex', sm: 'none' },

                    }}
                    variant="filled" to="/contact-me" component={Link}>

                    <MenuIcon sx={{
                        width: "36px",
                        height: "36px",
                        m: "15px",
                        color: "white",
                    }} />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}