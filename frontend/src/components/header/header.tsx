'use client';
import styles from './header.module.css';
import Link from 'next/link';
import Image from 'next/image';
import AuthBar from '../auth-bar/authBar';

const Header = () => {
  return (
    <div className={styles.header}>
      <Link href="/">
        <Image
          src="./logo.svg"
          alt="logo"
          className={styles.logo}
          width={120}
          height={39}
          priority
        />
      </Link>
      <h2>header</h2>
      <AuthBar/>
    </div>
  );
};

export default Header;
