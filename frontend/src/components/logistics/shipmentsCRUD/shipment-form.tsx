'use client';

import styles from './shipment-form.module.css';
import { useShipmentForm } from './hooks/useShipmentForm';
import { Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import InvoiceTable from '@/components/purchases/invoice-table';

export default function ShipmentForm({id}: {id?: number}) {
  const {
    tS,
    tB,
    localeCode,
    localeMap,
    control,
    register,
    handleSubmit,
    errors,
    selectedFiles,
    submitHandler,
    handleCancel,
    handleFileChange,
    handleRemoveFile,
  } = useShipmentForm(id);

  return (
    <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
      <div className={styles.formSection}>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={styles.required} htmlFor="alias">
              {tS('form.alias_label')}
            </label>
            <input
              id="alias"
              className={styles.input}
              {...register('alias', { required: 'Alias is required' })}
              type="text"
            />
            {errors.alias && (
              <span className={styles.errorText}>{errors.alias.message}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.required} htmlFor="status">
              {tS('form.status_label')}
            </label>
            <select
              id="status"
              className={styles.input}
              {...register('status', { required: 'Status is required' })}
            >
              <option value="">Select status</option>
              <option value="APPLIED">Applied</option>
              <option value="DECLARED">Declared</option>
              <option value="ARRIVED">Arrived</option>
            </select>
            {errors.status && (
              <span className={styles.errorText}>{errors.status.message}</span>
            )}
          </div>
        </div>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="declaration_number">
              {tS('form.declaration_number_label')}
            </label>
            <input
              id="declaration_number"
              className={styles.input}
              {...register('declaration_number')}
              type="text"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="declaration_date">
              {' '}
              {tS('form.declaration_date_label')}
            </label>
            <Controller
              control={control}
              name="declaration_date"
              render={({ field }) => (
                <DatePicker
                  locale={localeMap[localeCode as 'en' | 'ka']}
                  className={styles.input}
                  selected={field.value ? new Date(field.value) : null}
                  onChange={(date: Date | null) => {
                    if (!date) {
                      field.onChange('');
                      return;
                    }
                    const d = new Date(date);
                    d.setHours(12, 0, 0, 0);
                    field.onChange(d.toISOString().split('T')[0]);
                  }}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="yyyy-mm-dd"
                />
              )}
            />
          </div>
        </div>
      </div>

      <div className={styles.formSection}>
        <div className={styles.formGroup}>
          <label htmlFor="files">{tS('form.files_label')}</label>
          <input
            id="files"
            type="file"
            className={styles.input}
            onChange={handleFileChange}
            accept=".pdf,.jpg,.jpeg,.png,.xlsx,.xls,.doc,.docx"
            multiple
          />

          {/* Display selected files */}
          {selectedFiles.length > 0 && (
            <div className={styles.filesList}>
              <h4>{tS('form.selected_files')}</h4>
              <ul>
                {selectedFiles.map((file, index) => (
                  <li key={index}>
                    {file.name}
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(index)}
                      className={styles.removeFileBtn}
                    >
                      ✖
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className={styles.formSection}>
        {/* <InvoiceTable/> */}
      </div>
      <div className={styles.formActions}>
        <button
          type="button"
          className={styles.cancelButton}
          onClick={handleCancel}
        >
          {tB('cancel')}
        </button>
        <button type="submit" className={styles.saveButton}>
          {tB('add')}
        </button>
      </div>
    </form>
  );
}
