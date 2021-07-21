import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Button, FormControl, Fade } from "@material-ui/core";
import CardSection from "./CardSection";

export default function CheckoutForm({
  setPaymentMode,
  clientSecret,
  user,
  cancelTip,
  onClose,
  paymentSuccess,
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [confirmDisabled, setConfirmDisabled] = useState(false);

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();
    setConfirmDisabled(true);

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: user.name,
        },
      },
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      setConfirmDisabled(false);
      onClose();
      alert(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === "succeeded") {
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
        setConfirmDisabled(false);
        paymentSuccess();
        alert("Your tip has been sent, thank you!");
      }
    }
  };

  const handleBackButton = () => {
    cancelTip();
    setPaymentMode(false);
  };

  return (
    <Fade in={true}>
      <FormControl style={{ padding: "1rem", width: "100%" }}>
        <CardSection />
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: "2rem" }}
          type="submit"
          disabled={!stripe || confirmDisabled}
          onClick={handleSubmit}
        >
          Confirm order
        </Button>
        <Button
          variant="outlined"
          color="primary"
          style={{ marginTop: "0.5rem" }}
          disabled={!stripe}
          onClick={handleBackButton}
        >
          back
        </Button>
      </FormControl>
    </Fade>
  );
}
