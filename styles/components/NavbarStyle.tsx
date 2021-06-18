import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#FFFFFF",
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  squareButton: {
    margin: theme.spacing(1),
  },
  Avatar: {
    margin: 0,
    padding: 0,
    width: "24px",
    height: "24px",
  },
  logoButton: {
    marginRight: theme.spacing(2),
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  logo: {
    maxWidth: 80,
    marginRight: "8px",
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default useStyles;
