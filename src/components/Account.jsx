import React, { useEffect, useState } from 'react';
import userToken from './Login';


const Account = ({token}) => {
  const [userInfo, setUserInfo] = useState(null);
  

  useEffect(() => {
    fetchUserInfo();

  }, []);

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
            Name: {userInfo.firstname} {userInfo.lastname}
          </p>
          <p>Email: {userInfo.email}</p>
        </div>
      ) : (
        <p>Log in or Create and Account</p>
      )}
    </div>
   
);
};



export default Account;