import React, { useEffect, useState } from 'react'
import '../style/index.css'
import Navbar from './Navigation'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AllProducts from './AllProducts'
import RegistrationForm from './Register'
import LoginForm from './Login'
import Account from './Account'
const App = () => {
  const [pokemon, setPokemon] = useState([])

  useEffect(() => {
    const getAllData = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20')
        const { results } = await response.json()
        setPokemon(results)
      } catch (err) {
        console.error(err)
      }
    }
    getAllData()
  }, [])

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
      
      <p>Hello World</p>
      {!!pokemon.length &&
        pokemon.map((el, i) => {
          return (
            <div key={i}>
              <h1>{el.name}</h1>
            </div>
          )
        })}
    </div>
  )
}

export default App