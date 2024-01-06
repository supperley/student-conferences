import Dashboard from '../../components/Dashboard/Dashboard';
import PageLayout from '../../components/PageLayout/PageLayout';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <PageLayout>
        <Dashboard />
      </PageLayout>
    </div>
  );
};

export default Home;
