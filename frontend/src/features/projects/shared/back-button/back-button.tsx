import React from 'react';
import { useRouter } from 'next/navigation';
import { HiChevronLeft } from 'react-icons/hi2';
import styles from './back-button.module.css';

export const BackButton = () => {
  const router = useRouter();

  return (
    <button
      className={styles.backButton}
      onClick={() => router.push('/projects')}
    >
      <HiChevronLeft className={styles.backButtonIcon} />
      Projects list
    </button>
  );
};
