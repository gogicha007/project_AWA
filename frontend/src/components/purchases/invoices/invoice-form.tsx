'use client';

import styles from './invoice-form.module.css';
import { useEffect, useRef } from 'react';
import { InvoiceDTO, CurrencyDTO, VendorDTO } from '@/api/types';
import { useTranslations } from 'next-intl';
import { formatToISODateTime } from '@/utils/dateFormat';
import { useForm } from 'react-hook-form';
import DateInput from '@/components/controls/date-input/date-input';

type Props = {
  auxData: {
    currencies: Partial<CurrencyDTO>[];
    vendors: Partial<VendorDTO>[];
  };
  isOpen: boolean;
  onClose: () => void;
  onSave: (invoice: InvoiceDTO) => void;
  initialData?: InvoiceDTO;
  title: string;
  tVar: (key: string) => string;
};

type FormValues = InvoiceDTO;

export default function InvoiceDialog({
  auxData,
  initialData,
  isOpen,
  onClose,
  onSave,
  title,
  tVar,
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const tB = useTranslations('Buttons');
  console.log(auxData.currencies);
  const { control, handleSubmit, register } = useForm<FormValues>({
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
  // console.log(tVar('form.label.vendor'))
  const onSubmit = (data: FormValues) => {
    onSave({
      id: initialData?.id,
      invoiceNumber: data.invoiceNumber,
      invoiceDate: formatToISODateTime(
        data.invoiceDate === null ? undefined : data.invoiceDate
      ) as Date,
      vendorId: data.vendorId,
      currencyId: data.currencyId,
    });

    onClose();
  };

  return (
    <dialog ref={dialogRef} className={styles.dialog} onClose={onClose}>
      <div className={styles.dialogHeader}>
        <h2>{title}</h2>
        <button type="button" className={styles.closeButton} onClick={onClose}>
          ×
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="vendor">{tVar('form.label.vendor')}</label>
          <select
            {...register('vendorId', { required: true })}
            id="vendorId"
            className={styles.input}
          >
            <option value="">
              {tVar('form.label.vendor_placeholder') || '--Select--'}
            </option>
            {auxData.vendors.map((v) => (
              <option key={v.id} value={String(v.id)}>
                {v.alias}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formRow}>
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
            <DateInput
              label={tVar('form.label.invoice_date')}
              name="invoiceDate"
              control={control}
            />
          </div>
        </div>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="currency">{tVar('form.label.currency')}</label>
            <select
              {...(register('currencyId'), { required: true })}
              id="currency"
              className={styles.input}
            >
              <option value="">
                {tVar('form.label.currency_placeholder')}
              </option>
              {auxData.currencies.map((c) => (
                <option key={c.id} value={String(c.id)}>
                  {c.code}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="totalAmount">
              {tVar('form.label.total_amount')}
            </label>
            <input
              id="totalAmount"
              {...register('totalAmount', {
                required: 'Total amount is required',
              })}
              type="number"
              className={styles.input}
            />
          </div>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="isArrived">{tVar('form.label.is_arrived')}</label>
          <input type="checkbox" {...register('isArrived')} id="isArrived" />
        </div>
        <div className={styles.formActions}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onClose}
          >
            {tB('cancel')}
          </button>
          <button type="submit" className={styles.saveButton}>
            {tB('save')}
          </button>
        </div>
      </form>
    </dialog>
  );
}
