/**
 * Use the CSS tab above to style your Element's container.
 */
import React from "react";
import { CardElement } from "@stripe/react-stripe-js";
import { Typography } from "@material-ui/core";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};
function CardSection() {
  return (
    <label>
      <Typography
        variant="h6"
        style={{ fontFamily: "HeadLandOne", marginBottom: "1rem" }}
      >
        Enter Card Details
      </Typography>

      <CardElement options={CARD_ELEMENT_OPTIONS} />
    </label>
  );
}
export default CardSection;
