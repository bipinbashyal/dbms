import React from "react";
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
