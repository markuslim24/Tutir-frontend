import React, { useState } from "react";
import { client } from "../util/util";
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

const AddAComment = ({ user, videoId }) => {
  const classes = useStyles();
  const [focus, setFocus] = useState(false);
  const [comment, setComment] = useState("");
  const [isCommentDisabled, setIsCommentDisabled] = useState(false);

  const handleCancel = () => {
    setFocus(false);
    setComment("");
  };

  const handleComment = async () => {
    if (comment) {
      setIsCommentDisabled(true);
      try {
        let res = await client.post(`/comment/add`, {
          videoId: videoId,
          text: comment,
        });
      } catch (err) {
      } finally {
        setIsCommentDisabled(false);
        setFocus(false);
      }
    } else {
      console.log("no comment so no post");
      setFocus(false);
    }
  };

  return (
    <div className={classes.root} data-focus={focus}>
      <Avatar
        src={user ? user.profileImageUrl : ""}
        className={classes.Avatar}
      />
      <div className={classes.nameAndFieldContainer}>
        <Typography style={{ fontWeight: "bold" }}>
          {user ? user.name : ""}
        </Typography>
        <TextField
          type="text"
          fullWidth
          className={classes.textField}
          data-focus={focus}
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onFocus={() => setFocus(true)}
        />
        <div className={classes.buttonContainer}>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button disabled={isCommentDisabled} onClick={handleComment}>
            Comment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddAComment;
