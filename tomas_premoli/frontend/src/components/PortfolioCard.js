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
        <Grid item key={"grid" + props.entry.id} xs={12} sm={6} md={4}>
            <Card
                key={"card" + props.entry.id}
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
                <CardActionArea
                    key={"actionarea" + props.entry.id}
                >
                    <CardMedia
                        key={"media" + props.entry.id}
                        component="img"
                        image={props.entry.thumbnailpic}
                        alt="random"
                    />
                    <CardContent
                        key={"content" + props.entry.id}
                        sx={{
                            position: 'absolute',
                            color: 'white',
                            top: 8,
                            display: { isHovering },
                        }}>
                        <Typography gutterBottom variant="h5" component="h2" key={"title" + props.entry.id}>
                            {props.entry.title}
                        </Typography>
                        <Typography key={"blurb" + props.entry.id}>
                            {props.entry.blurb}
                        </Typography>
                        <IconButton align="center" href={props.entry.github_link} key={"git" + props.entry.id}>
                            <GitHubIcon key={"giticon" + props.entry.id} />
                        </IconButton>
                        {props.entry.link !== "" &&
                            <IconButton align="center" href={props.entry.link} key={"link" + props.entry.id}>
                                <LinkIcon key={"linkicon" + props.entry.id}/>
                            </IconButton>
                        }
                    </CardContent>
                </CardActionArea>
            </Card>
            {/* Card that has information appear on mouseover */}
        </Grid >
    );
}