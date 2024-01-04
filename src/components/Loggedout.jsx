import React from 'react';
import { Link } from 'react-router-dom';

const Loggedout = () => {
  return (
    <div>
      <h2>You've been successfully logged out</h2>
      <p>Click <Link to="/">here</Link> to return home.</p>
    </div>
  );
};

export default Loggedout;