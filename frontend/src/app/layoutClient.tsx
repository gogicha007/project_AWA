'use client';
import SideBar from '@/components/side-bar/SideBar';
import styles from './layout.module.css';
import { useEffect, useState } from 'react';

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('header');
      if (window.scrollY > 50) {
        header?.classList.add('scrolled');
      } else {
        header?.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <button
        onClick={toggleSidebar}
        className={`${styles.toggleButton} ${sidebarCollapsed ? styles.buttonCollapsed : ''}`}
        aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {sidebarCollapsed ? '›' : '‹'}
      </button>
      <div
        className={`${styles.base} ${sidebarCollapsed ? styles.sidebarCollapsed : ''}`}
      >
        <SideBar collapsed={sidebarCollapsed} />
        <div className={styles.base__main}>{children}</div>
      </div>
    </>
  );
}
