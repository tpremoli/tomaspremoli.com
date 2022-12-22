import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Footer from './Footer';
import SelectionMenu from './SelectionMenu';


export default function ContactMe() {
    

    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [comment, setComment] = React.useState("");

    const [nameError, setNameError] = React.useState(false);
    const [emailError, setEmailError] = React.useState(false);

    const [errorMsg, setErrorMsg] = React.useState("");
    const [successMsg, setSuccessMsg] = React.useState("");

    function handleSubmit() {
        setEmailError(false);
        setNameError(false);

        if (name.trim() == "") {
            setSuccessMsg("");
            setErrorMsg("Error: Name is not valid!");
            setNameError(true);
            return;

        } else if (!isEmail(email)) {
            setSuccessMsg("");
            setErrorMsg("Error: Email is not valid!");
            setEmailError(true);
            return;

        } else {
            const csrftoken = document.querySelector(
                "[name=csrfmiddlewaretoken]"
            ).value;

            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json", "X-CSRFToken": csrftoken },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    comment: comment,
                }),
            };

            try {
                fetch("/api/contact-me", requestOptions)
                    .then((response) => {
                        response.json()
                            .then((data) => {
                                if (data[0] == "OK") {
                                    setErrorMsg("");
                                    setSuccessMsg("Contact details sent!");
                                    setName("");
                                    setEmail("");
                                    setComment("");
                                } else {
                                    setErrorMsg("Error in sending data! Try again.");
                                    setSuccessMsg("");
                                }
                            });
                    });
            } catch (error) {
                setErrorMsg("Error in sending data! Try again.");
                setSuccessMsg("");
            }
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
                                    error={nameError}
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
