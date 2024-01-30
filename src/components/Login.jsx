import React, { useState, useEffect } from 'react';
import { useAuth } from './Auth';
import { useNavigate } from 'react-router-dom';
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
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

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
        localStorage.setItem('token', userToken);

        // Decode the token to get user information
        const decodedToken = parseJwt(userToken);
        console.log('Decoded Token:', decodedToken);

        // get userid from token and get userdata from API
        const userId = decodedToken.sub;
        const userResponse = await fetch(`https://fakestoreapi.com/users/${userId}`);
        const userJson = await userResponse.json();

        console.log(userJson);

        const loggedInUser = {
          id: userJson.userId,
          username: formData.username,
          name: userJson.name,
          email: userJson.email,
          phone: userJson.phone,
        };

        // Set the user in the context after fetching user data
        setUser(loggedInUser);

        // Save user info in localStorage
        localStorage.setItem('userInfo', JSON.stringify(loggedInUser));

        // Call onLogin with the necessary user data
        onLogin({
          token: userToken,
          username: formData.username,
        });

        // Update the state to trigger redirection
        setRedirect(true);
      } else {
        console.error('Login failed:', response.statusText);
        alert('Login Failed. Enter a valid Username and Password.');
      }
    } catch (error) {
      console.error('Login failed:', error.message);
      alert('Login failed. Check Username and Password');
    } finally {
      setLoading(false);
    }
  };

  // Redirect to home component if redirect state is true
  useEffect(() => {
    const handleRedirect = async () => {
      if (redirect) {
        // Trigger the redirect after the state is updated
        await new Promise((resolve) => setTimeout(resolve, 0));
        navigate('/');
      }
    };

    handleRedirect();
  }, [redirect, navigate]);

  return (
    <div className="flavor-container">
      <h2>Welcome Back!</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            id="username"
            autoComplete="username"
            value={formData.username}
            onChange={handleChange}
          />
        </label>
        <br />

        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <br />

        <button type="submit" disabled={loading} className="punch-button">
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export { parseJwt };
export default LoginForm;
