import { useState } from 'react';
import Aside from '../Aside/Aside';
import Header from '../Header/Header';
import styles from './PageLayout.module.css';
import clsx from 'clsx';

const PageLayout = (props: any) => {
  const [isWideScreen, setIsWideScreen] = useState(
    window.matchMedia('(min-width: 1200px)').matches,
  );
  const [isAsideOpen, setIsAsideOpen] = useState(isWideScreen);

  return (
    <>
      <Aside isAsideOpen={isAsideOpen} />
      <div className={styles.container}>
        <Header isWideScreen={isWideScreen} setIsAsideOpen={setIsAsideOpen} />
        {props.children}
      </div>
      <div
        className={clsx(styles.backdrop, isAsideOpen && styles.backdrop_shown)}
        onClick={() => {
          setIsAsideOpen((value) => !value);
        }}></div>
    </>
  );
};

export default PageLayout;
