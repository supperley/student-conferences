import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ROUTE_CONSTANTS } from '../shared/config/routes';
import Home from './Home/Home';
import NotFound from './NotFound/NotFound';
import PageLayout from '../components/PageLayout/PageLayout';
import Users from './Users/Users';
import News from './News/News';
import Settings from './Settings/Settings';
import Dashboard from './Dashboard/Dashboard';
import Reports from './Reports/Reports';
import Auth from './Auth/Auth';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import NewsPost from './NewsPost/NewsPost';
import Help from './Help/Help';
import Profile from './Profile/Profile';
import Conference from './Conference/Conference';
import User from './User/User';
import Conferences from './Conferences/Conferences';
import Report from './Report/Report';

const Router = () => {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route path="*" element={<NotFound />} />
        <Route path={ROUTE_CONSTANTS.HOME} element={<Home />} />
        <Route path={ROUTE_CONSTANTS.DASHBOARD} element={<Dashboard />} />
        <Route path={ROUTE_CONSTANTS.USERS} element={<Users />} />
        <Route path={ROUTE_CONSTANTS.USER} element={<User />} />
        <Route path={ROUTE_CONSTANTS.NEWS} element={<News />} />
        <Route path={ROUTE_CONSTANTS.NEWS_POST} element={<NewsPost />} />
        <Route path={ROUTE_CONSTANTS.HELP} element={<Help />} />
        <Route path={ROUTE_CONSTANTS.PROFILE} element={<Profile />} />
        <Route path={ROUTE_CONSTANTS.SETTINGS} element={<Settings />} />
        <Route path={ROUTE_CONSTANTS.CONFERENCES} element={<Conferences />} />
        <Route path={ROUTE_CONSTANTS.CONFERENCE} element={<Conference />} />
        <Route path={ROUTE_CONSTANTS.NOT_FOUND} element={<NotFound />} />
        <Route path={ROUTE_CONSTANTS.LOGIN} element={<Auth preSelected="login" />} />
        <Route path={ROUTE_CONSTANTS.REGISTER} element={<Auth preSelected="sign-up" />} />
        <Route path={ROUTE_CONSTANTS.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={ROUTE_CONSTANTS.REPORTS} element={<Reports />} />
        <Route path={ROUTE_CONSTANTS.REPORT} element={<Report />} />
      </Route>
    </Routes>
  );
};

export default Router;
