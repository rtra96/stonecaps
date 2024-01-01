import React, { useEffect, useState } from 'react'
import '../style/index.css'
import Navbar from './Navigation'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AllProducts from './AllProducts'
import RegistrationForm from './Register'
import LoginForm from './Login'
import Account from './Account'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
         <Routes>
          <Route path = "/"  element ={<AllProducts />} />
          <Route path = "/register"  element ={<RegistrationForm />} />
          <Route path = "/login"  element ={<LoginForm />} />
          <Route path = "/account"  element ={<Account />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App