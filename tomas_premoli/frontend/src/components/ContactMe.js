import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
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
    return (
        <Container disableGutters maxWidth={false}>
            <CssBaseline />
            {/* Header */}
            <SelectionMenu />
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
                                <TextField label="Name" variant="filled" sx={{ margin: "5px" }} />

                                <TextField label="Email" variant="filled" sx={{ margin: "5px" }} />

                                <TextField multiline rows={4} label="Comment" variant="filled" sx={{ margin: "5px" }} />

                                <Stack
                                    sx={{ pt: 4 }}
                                    direction="row"
                                    spacing={2}
                                    justifyContent="center"
                                >
                                    <Button href={""} variant="contained" color="success">Submit</Button>
                                    <Button href={""} variant="outlined" color="error">Clear</Button>
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
