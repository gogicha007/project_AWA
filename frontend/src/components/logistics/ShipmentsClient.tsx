'use client';

import styles from './shipments.module.css';
import { useTranslations } from 'next-intl';
import AddButton from '../controls/add-button/AddButton';
import { useShipmentsLogic } from './useShipmentsLogic';
import { useShipments } from '@/api/hooks/shipmentsHook';
import Loader from '../feedback/loader/loader';

export default function ShipmentsClient() {
  const tS = useTranslations('Logistics');
  const { shipments, loading, error, mutate } = useShipments();
  const { handleAdd } = useShipmentsLogic(shipments, mutate, tS);

  if (loading) return <Loader />;

  if (error)
    return (
      <div>
        `${tS('errors.loading')} : {String(error)}
      </div>
    );

  return (
    <div>
      <h1 className={styles.pageTitle}>{tS('title')}</h1>
      <div className={styles.tableContainer}>
        <div>
          <AddButton onAdd={handleAdd} />
        </div>
      </div>
    </div>
  );
}
