import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Icon, IconButton } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import CloseIcon from '@mui/icons-material/Close';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useTheme } from '@mui/material/styles';


export default function PortfolioEntry(props) {
    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (props.open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [props.open]);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <div>
            <Dialog
                maxWidth="md"
                fullScreen={fullScreen}
                open={props.open}
                onClose={() => { props.setOpen(false) }}
                scroll="body"
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title" sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>
                    {props.entry.title}
                    <IconButton onClick={() => { props.setOpen(false) }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent divider />

                {/* Top is video */}
                {/* Then is quick links (github, link to use) */}
                {/* Then is thorough description */}
                {/* Then is technologies used in list */}
                {/* Then is screenshots (https://mui.com/material-ui/react-image-list/) */}
                {/* Then is button links (github, link to use) */}

                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        {/* <IconButton align="center" href={props.entry.github_link} >
                            <GitHubIcon sx={{ color: "white" }} />
                        </IconButton>
                        {props.entry.link !== "" &&
                            <IconButton align="center" href={props.entry.link} >
                                <LinkIcon sx={{ color: "white" }} />
                            </IconButton>
                        } */}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { props.setOpen(false) }}>Cancel</Button>
                    <Button onClick={() => { props.setOpen(false) }}>Subscribe</Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}