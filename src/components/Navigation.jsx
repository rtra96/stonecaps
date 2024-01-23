import React from "react";
import { Link } from 'react-router-dom';
import { useCart } from "./CartContext";
import '../Nav.css';

function Navbar({ token, onLogout }) {
  const { cartItems } = useCart();
  
  return (
    <div className="navbar-container">
      <nav className="navbar">
        {/* navigation button routes */}
        <button className="navbar-button"><Link to="/">All Products</Link></button>
        <button className="navbar-button"><Link to="/register">Create an Account</Link></button>
        <button className="navbar-button"><Link to="/login">Login</Link></button>
        {token && (
          <>
            <button className="navbar-button"><Link to="/account">My Account</Link></button>
            <button className="navbar-button" onClick={onLogout}>Sign out</button>
          </>
        )}
        <button className="navbar-button"><Link to="/cart">Checkout ({cartItems.length})</Link></button>
      </nav>
    </div>
  );
}

export default Navbar;
