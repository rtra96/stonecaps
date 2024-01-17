import React from "react";
import { useCart } from "./CartContext";
import { useAuth } from "./Auth";
import { Link } from "react-router-dom";
import LoginForm from "./Login";
import Account from "./Account";

const OrderInformationForm = () => {
  const { user } = useAuth();
  const { cartItems } = useCart();
  console.log('User:', user);

  // Function to handle the checkout process
  const handleCheckout = () => {
    // I may write something for this; however, I know this API doesn't actually have this functionality
    console.log('Checkout logic goes here');
  };

  return (
    <div>
      <h2>Order Information</h2>
      {user ? (
        // Display user information if logged in
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          {/* Add form fields for shipping, billing, and card information here */}
          <button onClick={handleCheckout}>Place Order</button>
        </div>
      ) : (
        // Prompt user to log in or create an account
        <div>
          <p>Please log in or create an account to proceed with the checkout.</p>
          <button><Link to="/login">Login</Link></button>
          <button><Link to="/register">Create an Account</Link></button>
        </div>
      )}
    </div>
  );
};

export default OrderInformationForm;
