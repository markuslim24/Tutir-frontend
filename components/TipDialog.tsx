import React, { useState, useEffect } from "react";
import { client } from "../util/util";
import { useSelector } from "react-redux";
import { getUser } from "../store/slice/auth";
import {
  Button,
  Dialog,
  DialogActions,
  InputAdornment,
  Typography,
  TextField,
} from "@material-ui/core";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "2rem",
      '&[data-focus="true"] ': {
        "& $dialogActions": {
          display: "none",
        },
      },
    },
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
    dialogActions: {},
  })
);

const TipDialog = ({ openTipDialog, setOpenTipDialog, videoId }) => {
  const classes = useStyles();
  const user = useSelector(getUser);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [stripe, setStripe] = useState<Stripe>();
  const [tipAmount, setTipAmount] = useState("");
  const [paymentMode, setPaymentMode] = useState(false);
  const [clientSec, setClientSec] = useState("");
  const [tipId, setTipId] = useState("");
  const [connectAccountId, setConnectAccountId] = useState("");

  useEffect(() => {
    loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY
    ).then((res) => {
      setStripe(res);
    });
  }, []);

  const onClose = () => {
    setOpenTipDialog(false);
    setPaymentMode(false);
    setTipAmount("");
    if (tipId) {
      cancelTip();
    }
  };

  const paymentSuccess = () => {
    setOpenTipDialog(false);
    setPaymentMode(false);
    setTipAmount("");
    setTipId("");
    setClientSec("");
  };

  const cancelTip = async () => {
    await client.post("/tip/cancel", { tipId: tipId });
    setTipId("");
    setClientSec("");
  };

  const handle2button = () => {
    setTipAmount("2");
  };
  const handle5button = () => {
    setTipAmount("5");
  };
  const handle10button = () => {
    setTipAmount("10");
  };

  const handleTipChange = (e) => {
    const onlyNums = e.target.value.replace(/[^0-9]/g, "");
    setTipAmount(onlyNums);
  };

  const handleSubmit = async () => {
    if (tipAmount === "0" || tipAmount === "") {
      alert("Please enter a valid amount.");
    } else {
      try {
        const amountToTip = parseInt(tipAmount) * 100;
        let res = await client.post(`/tip/create`, {
          videoId: videoId,
          amount: amountToTip,
        });
        const { id, clientSecret, connectAccountId } = res.data.payload;
        setTipId(id);
        setClientSec(clientSecret);
        setConnectAccountId(connectAccountId);
        setStripe(
          await loadStripe(
            process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
            {
              stripeAccount: connectAccountId,
            }
          )
        );

        setPaymentMode(true);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Dialog open={openTipDialog} onClose={onClose}>
      <div className={classes.root} data-focus={paymentMode}>
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
          <Button
            className={classes.fixedTipAmtButton}
            onClick={handle2button}
            disabled={paymentMode}
          >
            $2
          </Button>
          <Button
            className={classes.fixedTipAmtButton}
            onClick={handle5button}
            disabled={paymentMode}
          >
            $5
          </Button>
          <Button
            className={classes.fixedTipAmtButton}
            onClick={handle10button}
            disabled={paymentMode}
          >
            $10
          </Button>
          <br />
          <br />
          <TextField
            variant="outlined"
            label="Custom Amount:"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            value={tipAmount}
            onChange={handleTipChange}
            disabled={paymentMode}
          ></TextField>
        </div>
        <br />
        {paymentMode ? (
          <Elements stripe={stripe}>
            <CheckoutForm
              setPaymentMode={setPaymentMode}
              clientSecret={clientSec}
              user={user}
              cancelTip={cancelTip}
              onClose={onClose}
              paymentSuccess={paymentSuccess}
            />
          </Elements>
        ) : (
          ""
        )}

        <DialogActions className={classes.dialogActions}>
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
