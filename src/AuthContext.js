// src/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

// Create context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if token exists in localStorage when the app is loaded
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true); // User is logged in
    }
  }, []);

  // Function to log in (called after successful login)
  const login = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  // Function to log out
  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
