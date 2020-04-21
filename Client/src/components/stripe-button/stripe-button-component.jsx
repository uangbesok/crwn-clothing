import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_4OotimZ2HfBYd8MjE3LTxy5q00xmsEkTdN";

  const onToken = (token) => {
    (async () => {
      try {
        const response = await axios({
          url: "payment",
          method: "post",
          data: {
            amount: priceForStripe,
            token,
          },
        });
        console.log("Server response ", response);
        alert("Payment successful!");
      } catch (error) {
        console.log("Payment error ", error);
        alert("There was an issue with payment");
      }
    })();
  };

  return (
    <StripeCheckout
      label="Pay now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://sendeyo.com/up/d/f3eb2117da"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
