import { Box, Link, makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";
import logo_light from "src/assets/images/logos/logo_light_mode.svg";
import logo_dark from "src/assets/images/logos/logo_dark_mode.svg";
import { useConfigContext } from "src/context/config/configContext";
import { navLinkConfig, THEME_MODE } from "src/config/constants";
import ConnectedButton from "../ConnectedButton";
import ToggleThemeButton from "../ToggleThemeButton";
import ToggleNetworkButton from "../ToggleNetworkButton";
import clsx from "clsx";
import MoreAppPopover from "../MoreAppPopover";

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.type === THEME_MODE.DARK ? "rgba(255, 255, 255, 0.65)" : "rgba(86, 100, 116, 0.8)",
    fontWeight: 400,
    fontSize: "16px",
    margin: "0px 4px",
    padding: theme.spacing(0, 1.5),
    "&:hover": {
      textDecoration: "none",
      color: theme.palette.text.highContrast,
    },
  },
  mainTitle: {
    color: theme.palette.primary.main,
    fontWeight: 450,
    fontSize: "16px",
    margin: "0px 4px",
    padding: theme.spacing(0, 1.5),
    "&:hover": {
      textDecoration: "none",
      color: theme.palette.primary.main,
    },
  },
}));

export default function Header() {
  const cls = useStyles();
  const { themeMode } = useConfigContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "more-app-popover" : undefined;

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" height="100%">
        <Box display="flex" justifyContent="flex-start" alignItems="center">
          <Link href="https://trava.finance/">
            <img
              src={themeMode === THEME_MODE.DARK ? logo_dark : logo_light}
              alt="Logo"
              style={{ width: 110, verticalAlign: "middle" }}
            />
          </Link>
          <Box ml={4} justifyContent="center" display="flex" alignItems="center">
            {navLinkConfig.slice(0, 3).map((element, index) => {
              return (
                <Link
                  key={index}
                  href={element["link"]}
                  className={clsx(cls.title, { [cls.mainTitle]: element["main"] })}
                  target={element["isToggle"] ? "_blank" : "_top"}
                >
                  {element["name"]}
                </Link>
              );
            })}
          </Box>
          <Box onClick={(event) => setAnchorEl(event.currentTarget)} style={{ cursor: "pointer" }}>
            <Typography className={cls.title}>More...</Typography>
          </Box>
        </Box>
        <Box display="flex" justifyContent="flex-end" alignItems="center">
          <Box mr={2}>
            <ToggleNetworkButton />
          </Box>
          <Box mr={1}>
            <ConnectedButton />
          </Box>
          <ToggleThemeButton />
        </Box>
      </Box>
      <MoreAppPopover {...{ id, open, anchorEl, setAnchorEl }} />
    </>
  );
}
