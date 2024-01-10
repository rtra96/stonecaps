import React, { useEffect, useState } from 'react';

const Account = ({ token }) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    fetchUserInfo();
  }, [token]);

  const fetchUserInfo = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/users/2', {
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

  return (
    <div className='account'>
      <h2>User Account Information</h2>
      {userInfo ? (
        <div>
          <p>
            Name: {userInfo.name.firstname} {userInfo.name.lastname}
          </p>
          <p>Email: {userInfo.email}</p>
          <p>Phone: {userInfo.phone}</p>
        </div>
      ) : (
        <p>Log in or Create an Account</p>
      )}
    </div>
  );
};

export default Account;