import { useState } from 'react';
import Aside from '../Aside/Aside';
import Header from '../Header/Header';
import styles from './PageLayout.module.css';
import clsx from 'clsx';
import { Outlet } from 'react-router-dom';

const PageLayout = () => {
  const [isWideScreen, setIsWideScreen] = useState(
    window.matchMedia('(min-width: 1200px)').matches,
  );
  const [isAsideOpen, setIsAsideOpen] = useState(isWideScreen);

  return (
    <>
      <div className={styles.bodyContainer}>
        <Aside isAsideOpen={isAsideOpen} />
        <div className={styles.pageContainer}>
          <Header isWideScreen={isWideScreen} setIsAsideOpen={setIsAsideOpen} />
          <Outlet />
        </div>
        <div
          className={clsx(styles.backdrop, isAsideOpen && styles.backdrop_shown)}
          onClick={() => {
            setIsAsideOpen((value) => !value);
          }}></div>
      </div>
    </>
  );
};

export default PageLayout;
