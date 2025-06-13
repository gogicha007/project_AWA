'use client';

import styles from '../forms/form.module.css';
import { useEffect, useRef } from 'react';
import { InvoiceDTO } from '@/api/types';
import { useTranslations } from 'next-intl';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (invoice: InvoiceDTO) => void;
  initialData?: InvoiceDTO;
  title: string;
  tVar: (key: string) => string;
};

export default function InvoiceDialog({
  isOpen,
  onClose,
  onSave,
  initialData,
  title,
  tVar,
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const tB = useTranslations('Buttons');
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    onSave({
      id: initialData?.id,
      invoiceNumber: formData.get('invoice-number') as string,
    });

    onClose();
  };

  return (
    <dialog ref={dialogRef} className={styles.dialog} onClose={onClose}>
      <h2>{title}</h2>
      <button type="button" className={styles.closeButton} onClick={onClose}>
        ×
      </button>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="invoice_number">{tVar('invoice_number')}</label>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="invoice_date">{tVar('invoice_date')}</label>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="currency">{tVar('currency')}</label>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="total_amount">{tVar('total_amount')}</label>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="truck_number">{tVar('truck_number')}</label>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="is_arrived">{tVar('is_arrived')}</label>
        </div>
      </form>
      <div className={styles.formActions}>
        <button type="button" className={styles.cancelButton} onClick={onClose}>
          {tB('cancel')}
        </button>
        <button type="submit" className={styles.saveButton}>
          {tB('save')}
        </button>
      </div>
    </dialog>
  );
}
