import Aside from '../Aside/Aside';
import Header from '../Header/Header';
import styles from './PageLayout.module.css';

const PageLayout = (props: any) => {
  return (
    <>
      <Aside />
      <div className={styles.container}>
        <Header />
        {props.children}
      </div>
    </>
  );
};

export default PageLayout;
