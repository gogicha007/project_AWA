'use client';

import styles from '../settings.module.css';
import { useTranslations } from 'next-intl';

export default function VendorsClient() {
  const tV = useTranslations('Vendors');
  return (
    <div>
      <h1 className={styles.pageTitle}>{tV('title')}</h1>
    </div>
  );
}
