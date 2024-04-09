import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';
import styles from './PageLayout.module.css';

const PageLayout = () => {
  return (
    <>
      <div className={styles.bodyContainer}>
        <Header />
        <main className="container mx-auto px-10 max-w-7xl flex flex-col flex-auto">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default PageLayout;
