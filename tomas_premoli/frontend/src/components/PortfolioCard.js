// React MUI card that reveals data when mouse hovers over
import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import PortfolioEntry from './PortfolioEntry';
import { isBrowser, isMobile } from 'react-device-detect';

export default function PortfolioCard(props) {
    const [isOpen, setOpen] = React.useState(false);
    const [isHovering, setHovering] = React.useState(false);

    return (
        <Grid item key={"grid" + props.entry.id} xs={12} sm={6} md={4}
            onMouseEnter={() => {isOpen ? setHovering(false) : setHovering(true)}}
            onMouseLeave={() => setHovering(false)}
            sx={{
                WebkitUserSelect: "none",
                WebkitTouchCallout: "none"
            }}
        >
            <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                onClick={() => { 
                    if(isBrowser || isHovering){
                        setHovering(false);
                        setOpen(true);
                    } else if(isMobile){
                        setHovering(true)
                    } 
                }}
            >
                <CardActionArea>
                    <CardMedia
                        component="img"
                        image={props.entry.thumbnailpic}
                        sx={isHovering ? {
                            filter: "brightness(50%)",
                            WebkitUserSelect: "none",
                            WebkitTouchCallout: "none"
                        } : {
                            WebkitUserSelect: "none",
                            WebkitTouchCallout: "none"
                        }}
                    />
                    {isHovering ? <CardContent
                        sx={{
                            position: 'absolute',
                            color: 'white',
                            top: 8,
                            width: "100%",
                            height: "100%"
                        }}>
                        <Typography gutterBottom variant="h5" component="h2" >
                            {props.entry.title}
                        </Typography>
                        <Typography>
                            {props.entry.blurb}
                        </Typography>
                        <Typography variant="subtitle2">
                            {props.entry.date_created}
                        </Typography>
                        <Typography variant="body2"
                            sx={{
                                position: "absolute", fontStyle: "italic",
                                right: "1.5vh", bottom: "1.5vh", textAlign: "right"
                            }}>
                            {isBrowser ? "Click for more!" : "Tap again for more!"}
                        </Typography>
                    </CardContent> : null}
                </CardActionArea>
            </Card>
            <PortfolioEntry entry={props.entry} open={isOpen} setOpen={setOpen} />
        </Grid >
    );
}