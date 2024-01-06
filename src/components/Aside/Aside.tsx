import clsx from 'clsx';
import styles from './Aside.module.css';

const Aside = ({ isAsideOpen }) => {
  return (
    <aside className={clsx(styles.container, isAsideOpen && styles.container_open)}>
      <a className={styles.logoContainer} href="#">
        <img className={styles.logo} alt="photoURL" src="/src/assets/react.svg" />
      </a>
      <div className={styles.user}>
        <div className={styles.avatarContainer}>
          <img className={styles.avatar} alt="photoURL" src="/src/assets/react.svg" />
        </div>
        <span className={styles.userName}>User name</span>
      </div>
      <nav>
        <a className={clsx(styles.link, 1 == 1 && styles.link_active)}>Dashboard</a>
        <a className={styles.link}>Users</a>
        <a className={styles.link}>Blog</a>
      </nav>
    </aside>
  );
};

export default Aside;
