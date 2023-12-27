import React, { useState } from 'react';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     const response = await fetch('https://fakestoreapi.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Account Created!:', responseData);
      } else {
        console.log (response);
        const msg = await response.json();
        console.log(msg);
        console.error('Registration failed:', response.statusText);
        
      }
    } catch (error) {
      console.log (err);
      console.error('Registration failed:', error.message);
      
    }
  };

  
  return ( <div>
  <h2>Create an Account</h2>
    <form onSubmit={handleSubmit}>
    <label> First Name:
        <input
          type="text"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          />
      </label>
      <br />
      
      <label> Last Name:
        <input
          type="text"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          />
      </label>
      <br />
      
      
      <label> Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          />
      </label>
      <br />

      <label>Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;