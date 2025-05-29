'use client';
import SideBar from '@/components/layout/side-bar/SideBar';
import styles from './layout.module.css';
import { useState } from 'react';

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

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
