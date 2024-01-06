import styles from './Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBell, faSearch } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.buttonsContainer}>
        <button className={styles.menuContainer}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <button className={styles.searchContainer}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      <div className={styles.buttonsContainer}>
        <button className={styles.buttonLanguage}>Language</button>
        <button className={styles.notificationContainer}>
          <FontAwesomeIcon icon={faBell} />
        </button>
        <button className={styles.buttonProfile}>Profile</button>
      </div>
    </div>
  );
};

export default Header;
