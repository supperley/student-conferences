import { SwitchTheme } from '../../features/theme/switchTheme/ui/SwitchTheme';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <span className={styles.title}>Dashboard</span>
      <SwitchTheme></SwitchTheme>
    </div>
  );
};

export default Dashboard;
