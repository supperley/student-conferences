import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { selectIsAuthenticated } from '../../redux/slices/authSlice';

export const ProtectedRoute = ({ redirectPath = '/login', children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  // const user = useSelector(selectUser);
  // const navigate = useNavigate();

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};
