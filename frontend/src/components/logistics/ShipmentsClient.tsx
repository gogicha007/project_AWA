'use client';

import styles from './shipments.module.css';
import { useTranslations } from 'next-intl';
// import AddButton from '../controls/add-button/AddButton';

export default function ShipmentsClient() {
  const tS = useTranslations('Logistics');

  return (
    <div>
      <h1 className={styles.pageTitle}>{tS('title')}</h1>
      <div className={styles.tableContainer}>
        <div>
          {/* <AddButton onAdd={handleAdd} /> */}
        </div>
      </div>
    </div>
  );
}
