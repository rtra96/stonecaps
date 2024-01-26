import React, { useContext } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from "./CartContext";
import { useAuth } from "./Auth";



function Navigationbar({ token, onLogout, resetCategoryFilter }) {
  const { cartItems, clearCart } = useContext(CartContext);
  const { user, logout } = useAuth(); 
  const navigate = useNavigate();


  // Function to handle Logo click
  const handleNileLinkClick = () => {
    // Call the resetCategoryFilter function to reset the category filter
    resetCategoryFilter();

    // Navigate to the home page
    navigate('/');
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand className="nilelogo" to="/" as={Link} onClick={resetCategoryFilter}>Nile.us</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {token ? (
              <>
                <Nav.Link disabled>Login</Nav.Link>
                <Nav.Link to="/cart" as={Link}>Cart</Nav.Link>
                <NavDropdown title={`Welcome, ${user ? user.username : "user"}`} id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Contact Us</NavDropdown.Item>
                  <NavDropdown.Item to="/account" as={Link} href="#action/3.2">View Account</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4" onClick={() => { clearCart(); logout(); onLogout(); localStorage.removeItem("cart"); }}>
                    Log Out
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link to="/login" as={Link}>Login</Nav.Link>
                <Nav.Link to="/cart" as={Link}>Cart</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
} 
export default Navigationbar