import React, { useState } from 'react';

const LoginForm = ({ setToken, setLoggedInUser }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
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

        // Store the token in the state
        setToken(userToken);

        // Use the user information directly from the login response
        const loggedInUser = {
          id: json.userId,
          username: formData.username,
          name: json.name,
          email: json.email,
          phone: json.phone,
        };

        // Store the logged-in user in the state
        setLoggedInUser(loggedInUser);

        alert('Login Successful!');
      } else {
        console.error('Login failed:', response.statusText);
        alert('Login Failed. Enter valid Username and Password');
      }
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  return (
    <div>
      <h2>Login to an Existing Account</h2>
      <form onSubmit={handleSubmit}>
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

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;