import React from "react";
import {Link} from 'react-router-dom';

function Navbar (){
  return ( 
  <div>
    <nav>
        {/* navigation button routes */}
        <button><Link to = "/">All Products</Link></button>
        <button><Link to = "/register">Create an Account</Link></button>
        <button><Link to = "/login">Login to an Existing Account</Link></button>
        <button><Link to = "/account">My Account</Link></button>
        <button><Link to = "/cart">Cart</Link></button>
        <button><Link to = "/logout">Sign out</Link></button>
        
    </nav>
  </div>

  );
}

export default Navbar;