import React, { Component } from "react";
import { render } from "react-dom";
import Home from "./Home";
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
                        {/* <Route path="/portfolio" element={<Portfolio />} /> */}
                        {/* <Route path="/resume" element={<Resume />} /> */}
                        {/* <Route path="/contact-me" element={<ContactMe />} /> */}
                    </Routes>
                </ThemeProvider>
            </Router >
        );
    }
}

const theme = createTheme();
const appDiv = document.getElementById("app");
render(<App />, appDiv);