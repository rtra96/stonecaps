import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './Navigation';
import AllProducts from './AllProducts';
import RegistrationForm from './Register';
import LoginForm from './Login';
import Account from './Account';
import Loggedout from './Loggedout';
import SingleProduct from './SingleProduct';
import { AuthProvider, useAuth } from './Auth';
import CartProvider  from './CartContext';
import Cart from './Cart';
import OrderInformationForm from './OrderInfo';

const App = () => {
  const [token, setToken] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { login, setUser } = useAuth();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token === null) {
      setLoggedInUser(null);
      setLoading(false);
      return;
    }

    fetchUserDetails();
  }, [token]);

  const fetchUserDetails = async () => {
    if (token) {
      try {
        const tokenData = parseJwt(token);
        const response = await fetch(`https://fakestoreapi.com/users/${tokenData.sub}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          login(userData);
          setUser(userData);
          setLoggedInUser(userData);
        } else {
          console.error('Failed to fetch user information:', response.statusText);
          setError('Failed to fetch user information. Please try again.');
        }
      } catch (error) {
        console.error('Error fetching user information:', error.message);
        setError('An unexpected error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  const handleLogout = () => {
    setToken(null);
    setLoggedInUser(null);
  };

  const handleLogin = async (userData) => {
    
    
  
    // Set the token first
    setToken(userData.token);
  
    // Waits 100 milliseconds before setting the user; allows the AuthProvider to update the context with the new token
    await new Promise((resolve) => setTimeout(resolve, 100));
  
    // Set the logged-in user
    setLoggedInUser(loggedInUser);
  
    alert('Login Successful!');
  };
  

  return (
    <CartProvider>
      <AuthProvider>
        <BrowserRouter>
        <div>
        <Navbar token={token} onLogout={handleLogout} />
            <Routes>
              <Route path="/" element={<AllProducts />} />
              <Route path="/register" element={<RegistrationForm />} />
              <Route
                path="/login"
                element={<LoginForm setToken={setToken} onLogin={handleLogin} />}
              />
              <Route path="/account" element={<Account token={token} setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser} loading={loading} error={error}/>} />
              <Route path="/logout" element={<Loggedout />} />
              <Route path="/product/:id" element={<SingleProduct />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<OrderInformationForm />} />
            </Routes>
            </div>  
        </BrowserRouter>
      </AuthProvider>
    </CartProvider>
  );
};

export default App;
