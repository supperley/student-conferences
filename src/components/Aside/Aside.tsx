import clsx from 'clsx';
import styles from './Aside.module.css';
import { NavLink } from 'react-router-dom';
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
        <NavLink
          to={ROUTE_CONSTANTS.HOME}
          className={({ isActive }) =>
            isActive ? clsx(styles.link, styles.link_active) : styles.link
          }>
          Dashboard
        </NavLink>
        <NavLink
          to={ROUTE_CONSTANTS.USERS}
          className={({ isActive }) =>
            isActive ? clsx(styles.link, styles.link_active) : styles.link
          }>
          Users
        </NavLink>
        <NavLink
          to={ROUTE_CONSTANTS.BLOG}
          className={({ isActive }) =>
            isActive ? clsx(styles.link, styles.link_active) : styles.link
          }>
          Blog
        </NavLink>
      </nav>
    </aside>
  );
};

export default Aside;
