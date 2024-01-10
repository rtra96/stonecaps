import React, { useEffect, useState } from 'react'
import '../style/index.css'
import Navbar from './Navigation'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AllProducts from './AllProducts'
import RegistrationForm from './Register'
import LoginForm from './Login'
import Account from './Account'
import Loggedout from './Loggedout'
import SingleProduct from './SingleProduct'

const App = () => {
  const [token, setToken] = useState(null);

  const handleLogout = () => {
    setToken(null);
  };
  return (
    <div>
      <BrowserRouter>
        <Navbar />
         <Routes>
          <Route path = "/"  element ={<AllProducts />} />
          <Route path = "/register"  element ={<RegistrationForm />} />
          <Route path = "/login"  element ={<LoginForm setToken={setToken}/>} />
          <Route path = "/account"  element ={<Account />} />
          <Route path = "/logout" element ={<Loggedout />} />
          <Route path="/products/:id" element={<SingleProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App