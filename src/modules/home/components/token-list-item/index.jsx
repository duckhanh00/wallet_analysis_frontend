import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import InfoIcon from '@mui/icons-material/Info';

const TokenListItem = () => {
  return (
    <Box sx={{width: "80%", height: "50px", margin: "0 auto", backgroundColor: "rgba(35,31,39,.5)", marginTop: "20px", borderRadius: "20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <Box ml={3} sx={{display: "flex", alignItems: "center"}}>
        <img
          src={require("../../../../assets/images/bitcoin.png")}
          alt="lo"
        />
        <Typography varaint="body1" sx={{color: "white", fontWeight: 500}} ml={2}>Bitcoin </Typography>
      </Box>
      <Box mr={3} sx={{display: "flex", alignItems: "center"}}>
        <a href="/home">
          <BubbleChartIcon sx={{color: "white", fontSize: "32px", marginRight: "15px"}}/>
        </a>
        <a href="/home">
          <InfoIcon sx={{color: "white", fontSize: "32px"}}/>
        </a>
      </Box>
    </Box>
  )
}

export default TokenListItem 