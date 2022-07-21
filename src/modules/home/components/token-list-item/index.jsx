import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import InfoIcon from '@mui/icons-material/Info';

const TokenListItem = ({tokenId, name, imgSrc}) => {
  console.log("/relationship-space/" + tokenId)
  return (
    <Box sx={{width: "80%", height: "50px", margin: "0 auto", backgroundColor: "rgba(35,31,39,.5)", marginTop: "20px", borderRadius: "20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <Box ml={3} sx={{display: "flex", alignItems: "center"}}>
        <img className="logo-img"
          src={imgSrc}
        />
        <Typography varaint="body1" sx={{color: "white", fontWeight: 500}} ml={2}>{name}</Typography>
      </Box>
      <Box mr={3} sx={{display: "flex", alignItems: "center"}}>
        <a href={"/relationship-space/" + tokenId} >
          <BubbleChartIcon sx={{color: "white", fontSize: "32px", marginRight: "15px"}}/>
        </a>
        <a href={"/whale-space/" + tokenId}>
          <InfoIcon sx={{color: "white", fontSize: "32px"}}/>
        </a>
      </Box>
    </Box>
  )
}

export default TokenListItem 