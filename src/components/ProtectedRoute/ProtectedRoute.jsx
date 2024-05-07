import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectIsAuthenticated, selectIsBlocked } from '../../redux/slices/authSlice';

export const ProtectedRoute = ({ redirectPath = '/login', children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isBlocked = useSelector(selectIsBlocked);

  if (isBlocked) {
    return <Navigate to={'/blocked'} replace />;
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};
