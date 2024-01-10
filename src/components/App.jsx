import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navigation';
import AllProducts from './AllProducts';
import RegistrationForm from './Register';
import LoginForm from './Login';
import Account from './Account';
import Loggedout from './Loggedout';

const App = () => {
  const [token, setToken] = useState(null);

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <div>
      <BrowserRouter>
        <Navbar token={token} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<AllProducts />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm setToken={setToken} />} />
          <Route path="/account" element={<Account token={token} />} />
          <Route path="/logout" element={<Loggedout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
