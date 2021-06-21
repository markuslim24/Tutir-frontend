import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  profileBar: {
    margin: "20px 0px",
    display: "flex",
    flexDirection: "row",
    position: "relative",
  },
  avatar: {
    alignSelf: "center",
    width: "100px",
    height: "100px",
  },
  profileInfo: { marginLeft: "20px", alignSelf: "center" },
  greeting: {
    position: "relative",
    padding: "4px",
  },
  editProfileButton: { position: "relative", top: "0px" },
});
