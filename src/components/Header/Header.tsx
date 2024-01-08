import styles from './Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBell, faGlobe, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';

const Header = ({ isWideScreen, setIsAsideOpen }) => {
  return (
    <header className={styles.container}>
      <div className={styles.buttonsContainer}>
        {!isWideScreen && (
          <button
            className={styles.menuContainer}
            onClick={() => {
              setIsAsideOpen((value) => !value);
            }}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        )}
        <button className={styles.buttonSearch}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      <div className={styles.buttonsContainer}>
        <button className={styles.buttonLanguage}>
          <FontAwesomeIcon icon={faGlobe} />
        </button>
        <button className={styles.buttonNotification}>
          <FontAwesomeIcon icon={faBell} />
        </button>
        <button className={styles.buttonProfile}>
          <FontAwesomeIcon icon={faUser} />
        </button>
      </div>
    </header>
  );
};

export default Header;
