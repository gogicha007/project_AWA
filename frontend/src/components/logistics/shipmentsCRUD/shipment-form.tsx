'use client';

import styles from './shipment-form.module.css';
import { useShipmentForm } from './hooks/useShipmentFormLogic';
import { Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Loader from '@/components/feedback/loader/loader';
import Snackbar from '@/components/feedback/snackbar/snackbar';
import FileUploader from '@/components/controls/file-uploader/FileUploader';

import InvoiceTable from '@/components/purchases/invoice-table';

export default function ShipmentForm({ id }: { id?: number }) {
  const {
    tS,
    tB,
    loading,
    localeCode,
    localeMap,
    control,
    register,
    handleSubmit,
    errors,
    fileDataArray,
    setFileDataArray,
    originalFiles,
    setIsFilesChanged,
    submitHandler,
    handleCancel,
    isEditMode,
    snackbarOpen,
    snackbarMessage,
    handleSnackbarClose,
  } = useShipmentForm(id);

  if (loading) return <Loader />;

  return (
    <>
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
                <span className={styles.errorText}>
                  {errors.status.message}
                </span>
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
          <FileUploader
            tS={tS}
            fileDataArray={fileDataArray}
            setFileDataArray={setFileDataArray}
            isEditMode={isEditMode}
            originalFiles={originalFiles}
            setIsFilesChanged={setIsFilesChanged}
          />
        </div>

        <div className={styles.formSection}><InvoiceTable tB={tB}/></div>
        
        <div className={styles.formActions}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={handleCancel}
          >
            {tB('cancel')}
          </button>
          <button type="submit" className={styles.saveButton}>
            {isEditMode ? tB('save') : tB('add')}
          </button>
        </div>
      </form>

      <Snackbar
        message={snackbarMessage}
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        duration={5000}
      />
    </>
  );
}
