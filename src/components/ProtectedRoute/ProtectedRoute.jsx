import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectIsPrivileged } from '../../redux/slices/authSlice';

export const ProtectedRoute = ({ redirectPath = '/blocked', children }) => {
  const isPrivileged = useSelector(selectIsPrivileged);

  if (!isPrivileged) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};
