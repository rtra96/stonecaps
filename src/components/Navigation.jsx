import React from "react";
import { Link } from 'react-router-dom';
import { useCart } from "./CartContext";

function Navbar({ token, onLogout }) {
  const { cartItems } = useCart();
  
  return (
    <div>
      <nav>
        {/* navigation button routes */}
        <button><Link to="/">All Products</Link></button>
        <button><Link to="/register">Create an Account</Link></button>
        <button><Link to="/login">Login to an Existing Account</Link></button>
        {token && (
          <>
            <button><Link to="/account">My Account</Link></button>
            <button onClick={onLogout}>Sign out</button>
          </>
        )}
        <button><Link to="/cart">Checkout ({cartItems.length})</Link></button>
      </nav>
    </div>
  );
}

export default Navbar;
