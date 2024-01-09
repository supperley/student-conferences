import { useState } from 'react';
import Aside from '../Aside/Aside';
import styles from './PageLayout.module.css';
import clsx from 'clsx';
import { Outlet } from 'react-router-dom';
import Header from '../../widgets/Header/Header';

const PageLayout = () => {
  return (
    <>
      <div>
        <Header />
        <main className="container mx-auto">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default PageLayout;
