import { Route, Routes } from 'react-router-dom';
import { AuthRoute } from '../components/AuthRoute/AuthRoute';
import PageLayout from '../components/PageLayout/PageLayout';
import { ProtectedRoute } from '../components/ProtectedRoute/ProtectedRoute';
import { ROUTE_CONSTANTS } from '../shared/config/routes';
import Auth from './Auth/Auth';
import Blocked from './Blocked/Blocked';
import Conference from './Conference/Conference';
import Conferences from './Conferences/Conferences';
import Dashboard from './Dashboard/Dashboard';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import Help from './Help/Help';
import Home from './Home/Home';
import News from './News/News';
import NewsPost from './NewsPost/NewsPost';
import NotFound from './NotFound/NotFound';
import Profile from './Profile/Profile';
import Report from './Report/Report';
import Reports from './Reports/Reports';
import ResetPassword from './ResetPassword/ResetPassword';
import Settings from './Settings/Settings';
import User from './User/User';
import Users from './Users/Users';

const Router = () => {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route path="*" element={<NotFound />} />
        <Route path={ROUTE_CONSTANTS.HOME} element={<Home />} />
        <Route path={ROUTE_CONSTANTS.LOGIN} element={<Auth preSelected="login" />} />
        <Route path={ROUTE_CONSTANTS.REGISTER} element={<Auth preSelected="sign-up" />} />
        <Route path={ROUTE_CONSTANTS.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={ROUTE_CONSTANTS.RESET_PASSWORD} element={<ResetPassword />} />
        <Route path={ROUTE_CONSTANTS.NEWS} element={<News />} />
        <Route path={ROUTE_CONSTANTS.NEWS_POST} element={<NewsPost />} />
        <Route path={ROUTE_CONSTANTS.NOT_FOUND} element={<NotFound />} />
        <Route path={ROUTE_CONSTANTS.BLOCKED} element={<Blocked />} />
        <Route element={<AuthRoute />}>
          <Route path={ROUTE_CONSTANTS.DASHBOARD} element={<Dashboard />} />
          <Route path={ROUTE_CONSTANTS.USER} element={<User />} />
          <Route path={ROUTE_CONSTANTS.HELP} element={<Help />} />
          <Route path={ROUTE_CONSTANTS.PROFILE} element={<Profile />} />
          <Route path={ROUTE_CONSTANTS.SETTINGS} element={<Settings />} />
          <Route path={ROUTE_CONSTANTS.CONFERENCES} element={<Conferences />} />
          <Route path={ROUTE_CONSTANTS.CONFERENCE} element={<Conference />} />
          <Route path={ROUTE_CONSTANTS.REPORTS} element={<Reports />} />
          <Route path={ROUTE_CONSTANTS.REPORT} element={<Report />} />
          <Route element={<ProtectedRoute />}>
            <Route path={ROUTE_CONSTANTS.USERS} element={<Users />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
