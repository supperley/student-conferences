import clsx from 'clsx';
import styles from './Aside.module.css';
import { Link } from 'react-router-dom';
import { ROUTE_CONSTANTS } from '../../shared/config/routes';

const Aside = ({ isAsideOpen }) => {
  return (
    <aside className={clsx(styles.container, isAsideOpen && styles.container_open)}>
      <a className={styles.logoContainer} href="#">
        <img className={styles.logo} alt="photoURL" src="src/shared/assets/react.svg" />
      </a>
      <div className={styles.user}>
        <div className={styles.avatarContainer}>
          <img className={styles.avatar} alt="photoURL" src="src/shared/assets/react.svg" />
        </div>
        <span className={styles.userName}>User name</span>
      </div>
      <nav>
        <Link to={ROUTE_CONSTANTS.HOME} className={clsx(styles.link, 1 == 1 && styles.link_active)}>
          Dashboard
        </Link>
        <Link to={ROUTE_CONSTANTS.USERS} className={styles.link}>
          Users
        </Link>
        <Link to={ROUTE_CONSTANTS.BLOG} className={styles.link}>
          Blog
        </Link>
      </nav>
    </aside>
  );
};

export default Aside;
