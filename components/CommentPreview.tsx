import React from "react";
import { Avatar, Button, TextField, Typography } from "@material-ui/core";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      display: "flex",
    },
    Avatar: {
      width: "50px",
      height: "50px",
      marginTop: "0.2rem",
      marginRight: "1rem",
    },
    nameAndCommentContainer: { flexGrow: 1 },
    textField: {
      display: "inline",
      width: "100%",
    },
    buttonContainer: {
      visibility: "hidden",
      width: "100%",
    },
  })
);

const CommentPreview = ({ user, text }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Avatar
        src={user ? user.profileImageUrl : ""}
        className={classes.Avatar}
      />
      <div className={classes.nameAndCommentContainer}>
        <Typography style={{ fontWeight: "bold" }}>
          {user ? user.name : ""}
        </Typography>
        <Typography>{text ? text : ""}</Typography>
      </div>
    </div>
  );
};

export default CommentPreview;
