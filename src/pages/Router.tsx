import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ROUTE_CONSTANTS } from '../shared/config/routes';
import Home from './Home/Home';
import NotFound from './NotFound/NotFound';
import PageLayout from '../components/PageLayout/PageLayout';

const Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PageLayout />}>
          <Route path="*" element={<NotFound />} />
          <Route path={ROUTE_CONSTANTS.HOME} element={<Home />} />
          <Route path={ROUTE_CONSTANTS.USERS} element={<NotFound />} />
          <Route path={ROUTE_CONSTANTS.SETTINGS} element={<NotFound />} />
          <Route path={ROUTE_CONSTANTS.NOT_FOUND} element={<NotFound />} />
        </Route>
        <Route path={ROUTE_CONSTANTS.LOGIN} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
