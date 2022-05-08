import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FormControlLabel from "@mui/material/FormControlLabel";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Footer from './Footer';
import SelectionMenu from './SelectionMenu';


export default function ContactMe() {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [comment, setComment] = React.useState("");

    const [emailError, setEmailError] = React.useState(false);

    const [errorMsg, setErrorMsg] = React.useState("");
    const [successMsg, setSuccessMsg] = React.useState("");

    function handleSubmit() {
        if (!isEmail(email)) {
            setSuccessMsg("");
            setErrorMsg("Error: Email is not valid!");
            setEmailError(true);
            return;
        } else {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    comment: comment
                }),
            };
            fetch("/api/contact-me", requestOptions)
                .then((response) => {
                    try {
                        response.json()
                            .then((data) => {
                                console.log(data);
                                setErrorMsg("");
                                setSuccessMsg("Contact details sent!");
                                setName("");
                                setEmail("");
                                setComment("");
                            });
                    } catch (error) {
                        setErrorMsg("Error in sending data! Try again.");
                        setSuccessMsg("Contact details sent!");
                    }
                });

        }
    }

    function isEmail(email) {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    function handleClear() {
        setName("");
        setEmail("");
        setEmailError("");
        setComment("");
    }

    return (
        <Container disableGutters maxWidth={false}>
            <CssBaseline />
            {/* Header */}
            <SelectionMenu />
            <Collapse
                in={errorMsg != ""}
            >
                <Alert
                    variant="filled"
                    color="error"
                    severity="error"
                    onClose={() => setErrorMsg("")}
                >
                    {errorMsg}
                </Alert>
            </Collapse>
            <Collapse
                in={successMsg != ""}
            >
                <Alert
                    variant="filled"
                    color="success"
                    severity="success"
                    onClose={() => setSuccessMsg("")}
                >
                    {successMsg}
                </Alert>
            </Collapse>
            {/* End Header */}
            <main>
                {/* Hero unit */}
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                        alignItems: "center",
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            Contact Me
                        </Typography>
                    </Container>

                    <Grid container direction="column" width="100%" justifyContent="center" alignItems="center">
                        <Grid item xs={3}>
                            <FormControl component="fieldset" sx={{ justifyContent: "center", alignItems: "center" }}>
                                <TextField
                                    required={true}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    label="Name"
                                    variant="filled"
                                    sx={{ margin: "5px" }}
                                />

                                <TextField
                                    required={true}
                                    value={email}
                                    error={emailError}
                                    onChange={(e) => setEmail(e.target.value)}
                                    label="Email"
                                    variant="filled"
                                    sx={{ margin: "5px" }}
                                />

                                <TextField
                                    required={true}
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    multiline
                                    rows={4}
                                    label="Comment"
                                    variant="filled"
                                    sx={{ margin: "5px" }}
                                />

                                <Stack
                                    sx={{ pt: 4 }}
                                    direction="row"
                                    spacing={2}
                                    justifyContent="center"
                                >
                                    <Button onClick={handleSubmit} variant="contained" color="success">Submit</Button>
                                    <Button onClick={handleClear} variant="outlined" color="error">Clear</Button>
                                </Stack>
                            </FormControl>
                        </Grid>
                    </Grid>

                </Box>
            </main>
            {/* Footer */}
            <Footer />
            {/* End footer */}
        </Container >
    );
}
