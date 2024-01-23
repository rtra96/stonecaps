import React, { useState, useEffect } from 'react';
import { useAuth } from './Auth';
import '../App.css';
// Decode JWT token
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

const LoginForm = ({ setToken, onLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const { login, setUser } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      const json = await response.json();

      if (response.ok) {
        console.log('Login Successful!:', json);
        const userToken = json.token;

        // Decode the token to get user information
        const decodedToken = parseJwt(userToken);
        console.log('Decoded Token:', decodedToken);

        // Set the token first
        setToken(userToken);

        //get userid from token and get userdata from API
        const userId= decodedToken.sub;
        let loggedInUser;
        fetch(`https://fakestoreapi.com/users/${userId}`)
            .then(res=>res.json())
            .then(json=>{console.log(json); setUser(json)
               loggedInUser = {
                id: json.userId,
                username: formData.username,
                name: json.name,
                email: json.email,
                phone: json.phone,
              };localStorage.setItem("userInfo",JSON.stringify(loggedInUser))})
            
        
        // Use the user information directly from the login response
         
        // const loggedInUser = {
        //   id: json.userId,
        //   username: formData.username,
        //   name: json.name,
        //   email: json.email,
        //   phone: json.phone,
        // };

        // Use a setTimeout to simulate an asynchronous update
        setTimeout(() => {
          // Then, set the user in the context
          login(loggedInUser);

          // Additional logic or alerts if needed
          alert('Login Successful!');
        }, 0);
      } else {
        console.error('Login failed:', response.statusText);
        alert('Login Failed. Enter a valid Username and Password.');
      }
    } catch (error) {
      console.error('Login failed:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
       <h2>Welcome Back!</h2>
       <form onSubmit={handleSubmit} className="login-form">
         <label>
           Username:
           <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <br />

        <button type="submit" disabled={loading}className="login-button" >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form> 
    </div>
  );
};

export default LoginForm;
