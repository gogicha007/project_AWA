'use client';

import styles from '../forms/form.module.css';
import { useEffect, useRef } from 'react';
import { InvoiceDTO } from '@/api/types';
import { useTranslations } from 'next-intl';
import { formatToISODateTime } from '@/utils/dateFormat';
import { useForm } from 'react-hook-form';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (invoice: InvoiceDTO) => void;
  initialData?: InvoiceDTO;
  title: string;
  tVar: (key: string) => string;
};

type FormValues = InvoiceDTO;
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

  const { register } = useForm<FormValues>({
    defaultValues: {
      invoiceNumber: initialData?.invoiceNumber || '',
      invoiceDate: initialData?.invoiceDate || undefined,
    },
  });
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    onSave({
      id: initialData?.id,
      invoiceNumber: formData.get('invoiceNumber') as string,
      invoiceDate: formatToISODateTime(formData.get('invoiceDate')) as Date,
      vendorId: formData.get('vendorId') as number,
      currencyId: formData.get('currencyId') as number
    });

    onClose();
  };

  return (
    <dialog ref={dialogRef} className={styles.dialog} onClose={onClose}>
      <h2>{title}</h2>
      <button type="button" className={styles.closeButton} onClick={onClose}>
        ×
      </button>

      <form onSubmit={onSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="invoiceNumber">
            {tVar('form.label.invoice_number')}
          </label>
          <input
            id="invoiceNumber"
            {...register('invoiceNumber', {
              required: 'Invoice number is required',
            })}
            type="text"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="invoiceDate">
            {tVar('form.label.invoice_date')}
          </label>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="currency">{tVar('form.label.currency')}</label>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="total_amount">
            {tVar('form.label.total_amount')}
          </label>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="truck_number">
            {tVar('form.label.truck_number')}
          </label>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="is_arrived">{tVar('form.label.is_arrived')}</label>
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
