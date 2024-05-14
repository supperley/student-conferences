import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectIsAdmin } from '../../redux/slices/authSlice';

export const AdminRoute = ({ redirectPath = '/blocked', children }) => {
  const isAdmin = useSelector(selectIsAdmin);

  if (!isAdmin) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};
