import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initially, no user is authenticated

  useEffect(() => {
    // Check for user information in localStorage on component mount
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      const parsedUserInfo = JSON.parse(storedUserInfo);
      setUser(parsedUserInfo);
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem("userInfo", JSON.stringify(userData));
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
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
