import React, { Component } from "react";
import { createRoot } from 'react-dom/client';
import Home from "./Home";
import Resume from "./Resume"
import Tutoring from "./Tutoring"
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
                        <Route path="/tutoring" element={<Tutoring />} />
                        <Route path="/portfolio" element={<Portfolio />} />
                        <Route path="/resume" element={<Resume />} />
                        <Route path="/contact-me" element={<ContactMe />} />
                    </Routes>
                </ThemeProvider>
            </HashRouter >
        );
    }
}

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });

const theme = createTheme({
    palette: {
        github: createColor('#171515'),
        linkedin: createColor('#0072b1'),
    }
});
const appDiv = document.getElementById("app");
const root = createRoot(appDiv);
root.render(<App />);