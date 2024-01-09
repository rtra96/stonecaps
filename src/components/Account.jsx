import React, { useEffect, useState } from 'react';

const Account = ({ token }) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    fetchUserInfo();
  }, [token]);

  const fetchUserInfo = async () => {
    if (!token) {
      // Handle the case where no token is available (user not logged in)
      return;
    }

    try {
      // Decode the token to extract user information
      const decodedToken = decodeToken(token);

      // Fetch user details using the user id from the decoded token
      const response = await fetch(`https://fakestoreapi.com/users/${decodedToken.userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUserInfo(userData);
      } else {
        console.error('Failed to fetch user information:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching user information:', error.message);
    }
  };

  const decodeToken = (token) => {
    // Decode the token payload
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    return JSON.parse(decodedPayload);
  };

  return (
    <div className='account'>
      <h2>User Account Information</h2>
      {userInfo ? (
        <div>
          <p>
            Name: {userInfo.firstname} {userInfo.lastname}
          </p>
          <p>Email: {userInfo.email}</p>
        </div>
      ) : (
        <p>Log in or Create an Account</p>
      )}
    </div>
  );
};

export default Account;
