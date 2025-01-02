import React, { createContext, useState, useContext, useEffect } from "react";

// Create the AuthContext
const AuthContext = createContext();

// Provide the AuthContext to the application
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores the authenticated user's data
  const [loading, setLoading] = useState(true); // Loading state for initial auth check
  const [token, setToken] = useState(null); // Stores authentication token

  // Simulate user authentication state persistence (e.g., check localStorage)
  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    const user = localStorage.getItem("user");
    if (savedToken) {
      // If token exists, simulate fetching user data
      setToken(savedToken);
      setUser(user); // Mock user data
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (user, token) => {
    // Mock API call
    localStorage.setItem("authToken", token); // Save token to localStorage
    localStorage.setItem("user", user);
    setToken(token);
    setUser(user); // Mock user data
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  // Context value
  const value = { user, token, login, logout, loading };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Hook to use AuthContext in components
export const useAuth = () => {
  return useContext(AuthContext);
};
