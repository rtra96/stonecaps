import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { useCart } from "./CartContext";
import { useAuth } from "./Auth";

function Navigationbar({ token, onLogout }) {
  const { cartItems } = useCart();
  const { user } = useAuth(); 

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand className="nilelogo" to="/" as={Link}>Nile.us</Navbar.Brand>
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
                  <NavDropdown.Item href="#action/3.4" onClick={onLogout}>
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

export default Navigationbar;

