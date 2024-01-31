import React, { useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
import { useAuth } from "./Auth";

function Navigationbar({
  token,
  onLogout,
  resetCategoryFilter,
  onLogin,
  navbarRefreshKey,
}) {
  const { cartItems, user, logout } = useAuth();
  const { clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleNileLinkClick = () => {
    resetCategoryFilter();
    navigate("/");
  };

  const handleDropdownSelect = () => {
    document.getElementById("basic-nav-dropdown").click();
  };

  return (
    <Navbar key={navbarRefreshKey} expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand
          className="nilelogo"
          to="/"
          as={Link}
          onClick={handleNileLinkClick}
        >
          Nile.on
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {token ? (
              <>
                <Nav.Link to="/cart" as={Link}>
                  Cart
                </Nav.Link>
                <NavDropdown
                  title={<>Welcome, {user ? user.username : "user"} </>}
                  id="basic-nav-dropdown"
                  onSelect={handleDropdownSelect}
                >
                  <NavDropdown.Item to="/account" as={Link}>
                    View Account
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    href="#action/3.4"
                    onClick={() => {
                      clearCart();
                      logout();
                      onLogout();
                      localStorage.removeItem("cart");
                    }}
                  >
                    Log Out
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link to="/login" as={Link}>
                  Login
                </Nav.Link>
                {/* Add 'Create Account' button */}
                <Nav.Link to="/register" as={Link}>
                  Create Account
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigationbar;