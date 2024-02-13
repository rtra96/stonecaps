import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import contact from "../images/contact.svg";
import orders from "../images/orders.svg";
import payment from "../images/payment.svg";
import useredit from "../images/useredit.svg";

const Account = ({ token, loggedInUser, setLoggedInUser, loading, error }) => {
  if (loading) {
    return <p>Loading user information...</p>;
  }

  return (
    <div className="account">
      {error ? (
        <p>{error}</p>
      ) : loggedInUser ? (
    <div className="your-account-container">
      <h2>Account Dashboard</h2>
        <h1>------------</h1>
        <div className="grid-container">
          <div className="grid-item">
            <Link to = "/edit" className="link-style" >
              <img src={useredit} 
               alt="edit user info"
               style={{ maxWidth: "100px", maxHeight: "100px" }} />
              <h3>Your Information</h3>
              <p>Update your personal info</p>
            </Link>
          </div>
        <div className="grid-item">
        <img src={orders} 
         alt="view order history"
         style={{ maxWidth: "100px", maxHeight: "100px" }} />
          <h3>Order History</h3>
          <p>View your previously processed orders</p>
        </div>
        <div className="grid-item">
          <img src={payment} 
           alt="payment information"
           style={{ maxWidth: "100px", maxHeight: "100px" }} />
          <h3>Update Payment Details</h3>
          <p>Add/edit payment information</p>
        </div>
        <div className="grid-item">
          <Link to = "/contact" className="link-style" >
          <img src={contact} 
           alt="contact support"
           style={{ maxWidth: "100px", maxHeight: "100px" }} />
          <h3>Support</h3>
          <p>Contact us</p>
          </Link>
        </div>
      </div>
    </div>
      ) : (
        <p>
          <Link to="/login">Log in </Link> or{" "}
          <Link to="/register">Create an Account</Link>
        </p>
      )}
    </div>
  );
};

export default Account;