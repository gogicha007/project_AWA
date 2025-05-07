'use client';
import styles from './header.module.css';
import AuthBar from '../auth-bar/authBar';

const Header = () => {
  return (
    <div className={styles.header}>
      <h2>header</h2>
      <AuthBar/>
    </div>
  );
};

export default Header;
