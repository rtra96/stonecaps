import React, { useEffect, useState } from 'react';

const Account = ({ token }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token === null) {
      setLoggedInUser(null);
      setLoading(false);
      return;
    }

    fetchUserDetails();
  }, [token]);

  const fetchUserDetails = async () => {
    if (token) {
      try {
        const tokenData = parseJwt(token);
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
          setError('Failed to fetch user information. Please try again.');
        }
      } catch (error) {
        console.error('Error fetching user information:', error.message);
        setError('An unexpected error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  if (loading) {
    return <p>Loading user information...</p>;
  }

  return (
    <div className="account">
      <h2>User Account Information</h2>
      {error ? (
        <p>{error}</p>
      ) : loggedInUser ? (
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
