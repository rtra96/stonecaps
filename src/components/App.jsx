import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navigation';
import AllProducts from './AllProducts';
import RegistrationForm from './Register';
import LoginForm from './Login';
import Account from './Account';
import Loggedout from './Loggedout';
import SingleProduct from './SingleProduct';
import { CartProvider } from './CartContext';
import Cart from './Cart';

const App = () => {
  const [token, setToken] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogout = () => {
    setToken(null);
    setLoggedInUser(null);
  };

  const handleLogin = (userData) => {
    setLoggedInUser(userData);
  };

  return (
    <div>
      <BrowserRouter>
        <CartProvider>
          <Navbar token={token} onLogout={handleLogout} />
          <Routes>
            <Route path="/" element={<AllProducts />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route
              path="/login"
              element={<LoginForm setToken={setToken} onLogin={handleLogin} />}
            />
            <Route path="/account" element={<Account token={token} loggedInUser={loggedInUser} />} />
            <Route path="/logout" element={<Loggedout />} />
            <Route path="/product/:id" element={<SingleProduct />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </CartProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
