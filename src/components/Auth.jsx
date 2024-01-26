import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initially, no user is authenticated

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  console.log('Auth Context:', context);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// import React, { createContext, useContext, useState } from 'react';
// import { CartContext } from './CartContext'; // Import the CartContext

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null); // Initially, no user is authenticated
//   const { addToCart } = useContext(CartContext); // Get the clearCart function from CartContext

//   const login = (userData) => {
//     setUser(userData);
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("userInfo");
//     setUser(null);

//     // Clear the cart when the user logs out
//     // clearCart();
    
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, setUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };
