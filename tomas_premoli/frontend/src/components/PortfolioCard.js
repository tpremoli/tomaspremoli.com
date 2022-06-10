// React MUI card that reveals data when mouse hovers over
import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import { Icon, IconButton } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import GitHubIcon from '@mui/icons-material/GitHub';


export default function PortfolioCard(props) {
    const [isHovering, setHovering] = React.useState(false);

    return (
        <Grid item key={"grid" + props.entry.id} xs={12} sm={6} md={4}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
        >
            <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
                <CardActionArea >
                    {isHovering ?
                        <CardMedia
                            component="img"
                            image={props.entry.thumbnailpic}
                            sx={{ filter: "brightness(50%)" }}
                        />
                        :
                        <CardMedia
                            component="img"
                            image={props.entry.thumbnailpic}
                        />
                    }
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
                        <IconButton align="center" href={props.entry.github_link} >
                            <GitHubIcon />
                        </IconButton>
                        {props.entry.link !== "" &&
                            <IconButton align="center" href={props.entry.link} >
                                <LinkIcon />
                            </IconButton>
                        }
                    </CardContent> : null}
                </CardActionArea>
            </Card>
            {/* Card that has information appear on mouseover */}
        </Grid >
    );
}