'use client';
import { useEffect, useRef } from 'react';
import styles from './header.module.css';
import AuthBar from '../auth-bar/authBar';
import useScroll from '@/hooks/use-scroll';

const Header = () => {
  const scrolled = useScroll(50);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      if (scrolled) {
        headerRef.current.classList.add('scrolled');
      } else {
        headerRef.current.classList.remove('scrolled');
      }
    }
  }, [scrolled]);

  return (
    <div className={styles.header} ref={headerRef}>
      <h2>header</h2>
      <AuthBar />
    </div>
  );
};

export default Header;