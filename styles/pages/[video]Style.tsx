import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "row",
      marginTop: theme.spacing(6),
    },

    flexItem: {
      width: "56rem",
      height: "auto",
      flexGrow: 1,
      padding: "10px",
    },
    videoToolbar: {
      display: "flex",
      flexWrap: "wrap",
      padding: "0px",
      width: "100%",
    },
    videoTitle: {
      flexGrow: 1,
    },
    tagsContainer: { height: "75px" },
    favouriteIcon: {},
    videoContainer: {
      width: "90%",
      marginTop: theme.spacing(2),
      backgroundColor: theme.palette.background.paper,
    },
    descriptionAndNotes: {
      marginTop: "10px",
      width: "16rem",
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
    },
    descriptionPanel: {
      width: "100%",
      flexGrow: 1,

      minHeight: "7rem",
      maxHeight: "15rem",
    },
    notesPanel: {
      marginTop: "10px",
      width: "100%",
      flexGrow: 1,
    },
    commentsPanel: {
      marginTop: "10px",
      width: "100%",
      flexGrow: 1,
      height: "auto",
    },
    commentsCards: {
      paddingTop: "10px",
      paddingBottom: "8px",
    },
  })
);
