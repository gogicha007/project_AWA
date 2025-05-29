'use client';
import { useEffect, useRef } from 'react';
import styles from './header.module.css'
import AuthBar from '../../controls/auth-bar/authBar';
import useScroll from '@/hooks/use-scroll';

const Header = () => {
  const scrolled = useScroll(10);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      if (scrolled) {
        headerRef.current.classList.add(styles.scrolled);
      } else {
        headerRef.current.classList.remove(styles.scrolled);
      }
    }
  }, [scrolled]);

  return (
    <div className={styles.header} ref={headerRef}>
      <h2></h2>
      <AuthBar />
    </div>
  );
};

export default Header;
