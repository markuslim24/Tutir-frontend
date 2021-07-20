import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  profileBar: {
    margin: "20px 0px",
    display: "flex",
    flexDirection: "row",
    position: "relative",
  },
  avatarContainer: {
    position: "relative",
    width: "100px",
    height: "100px",
    borderRadius: "50%",

    "&:hover ": {
      backgroundColor: "grey",
      cursor: "pointer",
    },

    "&:hover $avatar": {
      opacity: 0.5,
    },
    "&:hover $changeProfilePicture": {
      opacity: 1,
    },
  },
  changeProfilePicture: {
    transition: ".3s ease",
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    textAlign: "center",
    opacity: 0,
  },

  avatar: {
    width: "100%",
    height: "100%",
  },
  profileInfo: {
    marginLeft: "20px",
    alignSelf: "center",
    overflow: "auto",
    width: "100%",
  },
  greeting: {
    position: "relative",
    padding: "4px",
  },
  editProfileButton: { float: "left" },
  linkStripeButton: { marginLeft: "10px" },
});
