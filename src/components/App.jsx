import React, { useEffect, useState } from 'react'
import '../style/index.css'
import Navbar from './Navigation'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AllProducts from './AllProducts'
import RegistrationForm from './Register'
import LoginForm from './Login'
import Account from './Account'
import Loggedout from './Loggedout'

const App = () => {
  const [token, setToken] = useState(null);

  const handleLogout = () => {
    // Clear the token from state
    setToken(null);
    // You may also want to perform additional logout actions here, like redirecting the user
  };
  return (
    <div>
      <BrowserRouter>
        <Navbar />
         <Routes>
          <Route path = "/"  element ={<AllProducts />} />
          <Route path = "/register"  element ={<RegistrationForm />} />
          <Route path = "/login"  element ={<LoginForm />} />
          <Route path = "/account"  element ={<Account />} />
          <Route path = "/logout" element ={<Loggedout />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App