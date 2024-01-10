import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ROUTE_CONSTANTS } from '../shared/config/routes';
import Home from './Home/Home';
import NotFound from './NotFound/NotFound';
import PageLayout from '../components/PageLayout/PageLayout';
import Login from './Login/Login';
import Users from './Users/Users';
import Blog from './Blog/Blog';
import Settings from './Settings/Settings';
import Dashboard from './Dashboard/Dashboard';

const Router: FC = () => {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route path="*" element={<NotFound />} />
        <Route path={ROUTE_CONSTANTS.HOME} element={<Home />} />
        <Route path={ROUTE_CONSTANTS.DASHBOARD} element={<Dashboard />} />
        <Route path={ROUTE_CONSTANTS.USERS} element={<Users />} />
        <Route path={ROUTE_CONSTANTS.BLOG} element={<Blog />} />
        <Route path={ROUTE_CONSTANTS.SETTINGS} element={<Settings />} />
        <Route path={ROUTE_CONSTANTS.NOT_FOUND} element={<NotFound />} />
        <Route path={ROUTE_CONSTANTS.LOGIN} element={<Login />} />
        <Route path={ROUTE_CONSTANTS.REGISTER} element={<Login />} />
      </Route>
    </Routes>
  );
};

export default Router;
