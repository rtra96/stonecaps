// Account.jsx
import React, { useEffect, useState } from 'react';

const Account = ({ token }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    fetchUserDetails();
  }, [token]);

  const fetchUserDetails = async () => {
    if (token) {
      try {
        // Decode the token to get user information
        const tokenData = parseJwt(token);
        
        // Fetch user details using the obtained user ID from the token
        const response = await fetch(`https://fakestoreapi.com/users/${tokenData.sub}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setLoggedInUser(userData);
        } else {
          console.error('Failed to fetch user information:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user information:', error.message);
      }
    }
  };

  // Helper function to decode JWT token
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  return (
    <div className='account'>
      <h2>User Account Information</h2>
      {loggedInUser ? (
        <div>
          <p>
            Name: {loggedInUser.name.firstname} {loggedInUser.name.lastname}
          </p>
          <p>Email: {loggedInUser.email}</p>
          <p>Phone: {loggedInUser.phone}</p>
        </div>
      ) : (
        <p>Log in or Create an Account</p>
      )}
    </div>
  );
};

export default Account;
