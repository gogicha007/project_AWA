import styles from './freight-fields.module.css';
import { CurrencyDTO } from '@/api/types';
import { SnackbarControls } from '@/components/feedback/snackbar/snackbarTypes';
import React from 'react';
import { useTranslations } from 'next-intl';
import AddButton from '@/components/controls/add-button/AddButton';
import { useFreightTable } from './useFreightTable';

type Props = {
  currencies: Partial<CurrencyDTO>[];
  snackbarControls?: SnackbarControls;
};

const FreightFields = ({ currencies, snackbarControls }: Props) => {
  const tF = useTranslations('Freights');

  const { handleAddFreight } = useFreightTable({
    currencies,
    snackbarControls,
    tVar: tF,
  });

  return (
    <>
      <div className={styles.tableContainer}>
        <div className={styles.tableActions}>
          <AddButton onAdd={handleAddFreight} />
        </div>
        <table className={styles.table}></table>
      </div>
    </>
  );
};

export default FreightFields;
