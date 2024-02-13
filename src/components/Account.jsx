import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import contact from "../images/contact.svg";
import orders from "../images/orders.svg";
import payment from "../images/payment.svg";
import useredit from "../images/useredit.svg";
import Facebook from "../images/facebook.svg";
import Github from "../images/github.svg";
import Linkedin from "../images/linkedin.svg";

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
      <footer>
        <div className="social-icons">
          {/* GitHub Icon */}
          <a href="https://github.com/rtra96" target="_blank" rel="noopener noreferrer">
            <img src={Github} alt="GitHub" width="32" height="32" />
          </a>

          {/* LinkedIn Icon */}
          <a href="https://www.linkedin.com/in/rick-trahant/" target="_blank" rel="noopener noreferrer">
            <img src={Linkedin} alt="LinkedIn" width="32" height="32" />
          </a>

          {/* Facebook Icon */}
          <a href="https://www.facebook.com/profile.php?id=100003172443953" target="_blank" rel="noopener noreferrer">
            <img src={Facebook} alt="Facebook" width="32" height="32" />
          </a>
        </div>
      </footer>
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