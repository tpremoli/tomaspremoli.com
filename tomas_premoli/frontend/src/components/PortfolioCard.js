// React MUI card that reveals data when mouse hovers over
import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import PortfolioEntry from './PortfolioEntry';

export default function PortfolioCard(props) {
    const [isHovering, setHovering] = React.useState(false);
    const [isOpen, setOpen] = React.useState(false);

    return (
        <Grid item key={"grid" + props.entry.id} xs={12} sm={6} md={4}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            onClick={() => setHovering(false)}
        >
            <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
                <CardActionArea onClick={isHovering ? () => { setOpen(true) } : null} >
                    <CardMedia
                        component="img"
                        image={props.entry.thumbnailpic}
                        sx={isHovering ? { filter: "brightness(50%)" } : null}
                    />
                    {isHovering ? <CardContent
                        sx={{
                            position: 'absolute',
                            color: 'white',
                            top: 8,
                        }}>
                        <Typography gutterBottom variant="h5" component="h2" >
                            {props.entry.title}
                        </Typography>
                        <Typography >
                            {props.entry.blurb}
                        </Typography>
                    </CardContent> : null}
                </CardActionArea>
                <PortfolioEntry entry={props.entry} open={isOpen} setOpen={setOpen} />
            </Card>
        </Grid >
    );
}