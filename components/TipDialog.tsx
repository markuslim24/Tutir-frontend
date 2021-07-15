import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Typography,
  TextField,
} from "@material-ui/core";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { padding: "2rem" },
    header: { margin: "auto", textAlign: "center" },
    emoji: {
      textAlign: "center",
      fontSize: "60px",
    },
    tipAmountSection: { textAlign: "center" },
    fixedTipAmtButton: {
      maxWidth: "60px",
      maxHeight: "60px",
      minWidth: "60px",
      minHeight: "60px",
      fontSize: "1.3rem",
      borderRadius: "50%",
      borderColor: "black",
      border: "2px solid",
      backgroundColor: "#FDD239",
      ["&:hover"]: {
        backgroundColor: "#E7B813",
      },
      marginLeft: "18px",
      marginRight: "18px",
    },
  })
);

const TipDialog = ({ openTipDialog, setOpenTipDialog }) => {
  const classes = useStyles();
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  const onClose = () => {
    setOpenTipDialog(false);
  };

  const handleSubmit = () => {
    console.log("handle submit here");
  };

  return (
    <Dialog open={openTipDialog} onClose={onClose}>
      <div className={classes.root}>
        <div className={classes.header}>
          <Typography variant="h4" style={{ fontFamily: "HeadLandOne" }}>
            Thanks!
          </Typography>
          <Typography variant="h6" style={{ fontFamily: "HeadLandOne" }}>
            A word from the creator: Hey, really appreciate the gesture! It’s
            people like you that make this possible :)
          </Typography>
        </div>

        <div
          className={classes.emoji}
          role="img"
          aria-label={"hug"}
          aria-hidden={"false"}
        >
          {"🤗"}
        </div>
        <div className={classes.tipAmountSection}>
          <Typography variant="h5" style={{ fontFamily: "HeadLandOne" }}>
            How much would you like to tip?
          </Typography>
          <br />
          <Button className={classes.fixedTipAmtButton}>$2</Button>
          <Button className={classes.fixedTipAmtButton}>$5</Button>
          <Button className={classes.fixedTipAmtButton}>$10</Button>
          <br />
          <br />
          <TextField variant="outlined" label="Custom Amount:"></TextField>
        </div>
        <br />
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={isSubmitDisabled}
            onClick={handleSubmit}
            color="primary"
          >
            Submit
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default TipDialog;
