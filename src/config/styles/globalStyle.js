import { color1, color2, color3, color4, color5, color6 } from "./colorConfig";
import { makeStyles } from "@material-ui/core";

export const useTextGlobalStyle = makeStyles((theme) => ({
  figureColor1: {
    color: color1,
    fontSize: "20px",
    fontWeight: 500,
  },
  textColor1: {
    color: color1,
    fontSize: "12px",
    fontWeight: 500,
  },
  figureColor2: {
    color: color2,
    fontSize: "20px",
    fontWeight: 500,
  },
  textColor2: {
    color: color2,
    fontSize: "12px",
    fontWeight: 500,
  },
  figureColor3: {
    color: color3,
    fontSize: "20px",
    fontWeight: 500,
  },
  textColor3: {
    color: color3,
    fontSize: "12px",
    fontWeight: 500,
  },
  figureColor4: {
    color: color4,
    fontSize: "20px",
    fontWeight: 500,
  },
  textColor4: {
    color: color4,
    fontSize: "12px",
    fontWeight: 500,
  },
  figureColor5: {
    color: color5,
    fontSize: "20px",
    fontWeight: 500,
  },
  textColor5: {
    color: color5,
    fontSize: "12px",
    fontWeight: 500,
  },
  figureColor6: {
    color: color6,
    fontSize: "20px",
    fontWeight: 500,
  },
  textColor6: {
    color: color6,
    fontSize: "12px",
    fontWeight: 500,
  },
  date: {
    color: theme.palette.text.disabled,
  },
}));

export const useGlobalStyle = makeStyles((theme) => ({
  overviewConstantPadding: {
    marginTop: "1.5rem",
  },
  defaultText: {
    color: theme.palette.text.hint,
  },
}));
