import React, { useEffect, useState } from 'react';

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
        <p>Log in or Create an Account</p>
      )}
    </div>
  );
};

export default Account;
