import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import "./Stripe.css"
import { useSelector } from "react-redux";
import { selectCurrentOrder } from "../../features/order/orderSlice";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  "pk_test_51PFCuwSAmgkvZkxc4CEqc2gMZrZN1u2iSrXYCXqrnzKNMx0hNBCQ1KhNtlqBbYsO9aVa6ks0RLAXGHQyUZHsvxwO00SsLo2xMZ"
);

const StripeCheckout = () => {
  const [clientSecret, setClientSecret] = useState("");
  const currentOrder = useSelector(selectCurrentOrder);
  console.log(currentOrder);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:4000/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(currentOrder),
      metadata:{
        order_id:currentOrder.id,
        //this info will go to stripe =>and then to our webhook
        // so we can conclude that payment was successful, even if client closes windows after payment 
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setClientSecret(data.clientSecret)});
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="Stripe">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default StripeCheckout;
