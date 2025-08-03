import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from '../utils/crypto';


const ProtectedRoute = ({ children }) => {
  const token = getToken('authToken');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
