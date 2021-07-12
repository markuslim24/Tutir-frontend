import React, { useState } from "react";
import { Avatar, Button, TextField, Typography } from "@material-ui/core";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      display: "flex",
      '&[data-focus="true"] ': {
        "& $buttonContainer": {
          visibility: "visible",
        },
      },
    },
    Avatar: {
      width: "50px",
      height: "50px",
      marginTop: "0.2rem",
      marginRight: "1rem",
    },
    nameAndFieldContainer: { flexGrow: 1 },
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

const AddAComment = ({ user }) => {
  const classes = useStyles();
  const [focus, setFocus] = useState(false);
  const [comment, setComment] = useState("");

  const handleComment = () => {
    console.log("Handle comment submission here");
  };

  return (
    <div className={classes.root} data-focus={focus}>
      <Avatar
        src={user ? user.profileImageUrl : ""}
        className={classes.Avatar}
      />
      <div className={classes.nameAndFieldContainer}>
        <Typography>{user ? user.name : ""}</Typography>
        <TextField
          type="text"
          fullWidth
          className={classes.textField}
          data-focus={focus}
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onBlur={() => setFocus(false)}
          onFocus={() => setFocus(true)}
        />
        <div className={classes.buttonContainer}>
          <Button onClick={() => setFocus(false)}>Cancel</Button>
          <Button onClick={handleComment}>Comment</Button>
        </div>
      </div>
    </div>
  );
};

export default AddAComment;
