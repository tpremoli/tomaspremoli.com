import * as React from 'react';
import TPSVG from './Logo'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

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
                    <Button color="primary" variant="filled" to="/about-me" component={Link}>
                        About Me
                    </Button>
                    <Button color="primary" variant="filled" to="/portfolio" component={Link}>
                        Portfolio
                    </Button>
                    <Button color="primary" variant="filled" to="/resume" component={Link}>
                        Resume/CV
                    </Button>
                    <Button color="primary" variant="filled" to="/contact-me" component={Link}>
                        Contact Me
                    </Button>
                </Box>

                <Box sx={{ align: "flex-start", flex: 1 }}>
                </Box>
            </Toolbar>
        </AppBar>
    );
}