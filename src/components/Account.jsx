import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const Account = ({ token, loggedInUser, setLoggedInUser, loading, error }) => {
  

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
        <p><Link to="/login">Log in </Link> or <Link to="/register">Create an Account</Link></p>
      )}
    </div>
  );
};

export default Account;
