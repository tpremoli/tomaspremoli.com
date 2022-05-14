import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Icon, IconButton } from '@mui/material';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Divider } from '@mui/material';

import TPSVG from './Logo'
import MenuIcon from '@mui/icons-material/Menu';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const navigationLinks = [
    { name: "Home", to: "/" },
    { name: "About Me", to: "/about-me" },
    { name: "Portfolio", to: "/portfolio" },
    { name: "Resume/CV", to: "/resume" },
    { name: "Contact Me", to: "/contact-me" },
]

export default function SelectionMenu(props) {
    const [open, setOpen] = useState(false);

    return (

        <AppBar position="relative" sx={{ flexDirection: "column", flexWrap: "wrap" }} >
            <Toolbar disableGutters>
                <Box sx={{ align: "flex-start", flex: 1 }} >
                    <TPSVG width={"36px"} height={"36px"} m={"15px"} mb={"7px"} />
                </Box>

                <Typography variant="h6" color="inherit" noWrap>
                </Typography>
                <Box sx={{ display: { xs: 'none', sm: 'flex' } }}
                    style={{
                        textAlign: "center",
                        flexWrap: "wrap",
                    }}>
                    {navigationLinks.map((item) => (
                        <Button
                            color="primary"
                            variant="filled"
                            to={item.to}
                            component={Link}>
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
                    onClick={() => setOpen(true)}
                    variant="filled">
                    <MenuIcon
                        sx={{
                            width: "36px",
                            height: "36px",
                            m: "15px",
                            color: "white",
                        }}
                    />
                </IconButton>
            </Toolbar>
            <SwipeableDrawer
                anchor="right"
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}>
                <div>
                    <IconButton onClick={() => setOpen(false)} >
                        <ChevronRightIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {navigationLinks.map((item, i) => (
                        <ListItem sx={{ width: "100%" }} key={i}>
                            <Button sx={{ width: "100%", textAlign:"left" }}
                                key={i}
                                color="primary"
                                variant="filled"
                                to={item.to}
                                component={Link}>
                                {item.name}
                            </Button>
                        </ListItem>
                    ))}
                </List>
            </SwipeableDrawer>
        </AppBar >
    );
}