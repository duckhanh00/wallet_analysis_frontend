import React, { Component, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import HomeIcon from '@mui/icons-material/Home';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import InfoIcon from '@mui/icons-material/Info';
import { Box, Typography } from "@mui/material";
import TelegramIcon from '@mui/icons-material/Telegram'

const locations = {
  "Home": [<HomeIcon />, "/home"],
  "Relationship Space": [<BubbleChartIcon />, "/relationship-space"],
  "Whale Space": [<InfoIcon />, "/whale-space"]
};
function Header(props) {
  const isPathActive = (path) => {
    return props.location.pathname.startsWith(path);
  }

  return (
    <Box>
      <Box
        className="az-header"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ marginLeft: "80px" }}>
          <a href="#/" className="az-logo">
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <img
                className="header-logo"
                src={require("../../assets/images/bitcoin.png")}
                alt="lo"
              />
              <Typography variant="h6" ml={1} sx={{ fontWeight: 600 }}>
                Blockchain Space
              </Typography>
            </Box>
          </a>
        </Box>
        <Box className="az-header-menu" sx={{ marginRight: "80px" }}>
          <ul className="nav">
            {Object.keys(locations).map((location) => (
              <Box
                sx={{ padding: "10px 0", margin: "0 15px", height: "100%", display: "flex", alignItems: "center" }}
              >
                <Box
                  className={
                    isPathActive(locations[location][1]) ? "nav-item active" : "nav-item"
                  }
                >
                  <Link to={locations[location][1]} className="nav-link">
                    {locations[location][0]}
                    <Typography variant="body1" sx={{ fontWeight: 600 }} ml={0.5}>
                      {location}
                    </Typography>
                  </Link>
                </Box>
              </Box>
            ))}
            <Box
              sx={{ padding: "10px 0", margin: "0 15px", height: "100%", display: "flex", alignItems: "center" }}
            >
              <Box className="nav-item">
                <a target="_blank" href="https://t.me/+p0WwKjDZ29hlNzQ1/" className="nav-link">
                  <TelegramIcon />
                  <Typography variant="body1" sx={{ fontWeight: 600 }} ml={0.5}>
                    Join us
                  </Typography>
                </a>
              </Box>
            </Box>
          </ul>
        </Box>
      </Box>
    </Box>
  );
}

export default withRouter(Header);
