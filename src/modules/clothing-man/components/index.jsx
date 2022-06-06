import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import { CardActionArea } from '@mui/material';

function ClothingMan(props) {
    return (
        <Card sx={{ maxWidth: 400 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="450"
                    image="https://cdn.ssstutter.com/products/nCRHI1bpbr1ZIsxG/042022/1651118155834.jpeg"
                    alt="green iguana"
                />
                <CardContent>
                    <Typography variant="h5" component="div">
                        Lizard
                    </Typography>
                    <Typography gutterBottom variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles
                    </Typography>
                    <Typography variant="h4" component="div">
                        $29
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

function mapState(state) {
    const { } = state
    return {}
}
const actions = {

}

export default connect(mapState, actions)(ClothingMan)