import React, { Component } from "react";
import { createRoot } from 'react-dom/client';
import Home from "./Home";
import Resume from "./Resume"
import AboutMe from "./AboutMe"
import ContactMe from "./ContactMe"
import Portfolio from "./Portfolio"
import { createTheme, ThemeProvider } from '@mui/material/styles';

import {
    Routes,
    Route,
    HashRouter,
} from "react-router-dom";

// To separate into different files. Will implement later to improve performance
// const Home = React.lazy(() => import("./Home"));
// const ContactMe = React.lazy(() => import("./ContactMe"));
// const Resume = React.lazy(() => import("./Resume"));
// const AboutMe = React.lazy(() => import("./AboutMe"));
// const Portfolio = React.lazy(() => import("./Portfolio"));

export default class App extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <HashRouter>
                <ThemeProvider theme={theme}>
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route path="/about-me" element={<AboutMe />} />
                        <Route path="/portfolio" element={<Portfolio />} />
                        <Route path="/resume" element={<Resume />} />
                        <Route path="/contact-me" element={<ContactMe />} />
                    </Routes>
                </ThemeProvider>
            </HashRouter >
        );
    }
}

const theme = createTheme();
const appDiv = document.getElementById("app");
const root = createRoot(appDiv); 
root.render(<App />);