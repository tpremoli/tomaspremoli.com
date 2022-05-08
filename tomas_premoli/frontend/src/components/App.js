import React, { Component } from "react";
import { createRoot } from 'react-dom/client';
import Home from "./Home";
import Resume from "./Resume"
import ContactMe from "./ContactMe"
import Portfolio from "./Portfolio"
import { createTheme, ThemeProvider } from '@mui/material/styles';

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Redirect,
} from "react-router-dom";

export default class App extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <Router>
                <ThemeProvider theme={theme}>
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        {/* <Route path="/about-me" element={<x />} /> */}
                        <Route path="/portfolio" element={<Portfolio />} />
                        <Route path="/resume" element={<Resume />} />
                        <Route path="/contact-me" element={<ContactMe />} />
                    </Routes>
                </ThemeProvider>
            </Router >
        );
    }
}

const theme = createTheme();
const appDiv = document.getElementById("app");
const root = createRoot(appDiv); 
root.render(<App />);