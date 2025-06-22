'use client';

import styles from './shipment-form.module.css';
import { useShipmentFormLogic } from './hooks/useShipmentFormLogic';
import 'react-datepicker/dist/react-datepicker.css';
import Loader from '@/components/feedback/loader/loader';
import Snackbar from '@/components/feedback/snackbar/snackbar';
import ShipmentTabs from './shipment-tabs';
import DateInput from '@/components/controls/date-input/date-input';

export default function ShipmentForm({ id }: { id?: number }) {
  const {
    control,
    currencies,
    errors,
    fileDataArray,
    handleSubmit,
    handleCancel,
    handleSnackbarClose,
    invoiceArray,
    isEditMode,
    loading,
    originalFiles,
    register,
    setFileDataArray,
    setIsFilesChanged,
    snackbarOpen,
    snackbarMessage,
    submitHandler,
    tB,
    tS,
    vendors,
  } = useShipmentFormLogic(id);

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
              <p className={styles.errorText}>{errors.alias?.message}</p>
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
              <p className={styles.errorText}>{errors.status?.message}</p>
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
              <DateInput
                label={tS('form.declaration_date_label')}
                name="declaration_date"
                control={control}
                rules={{
                  validate: (value, formValues) => {
                    if (
                      formValues?.declaration_number &&
                      (!value || value === '')
                    ) {
                      return `${tS('errors.declaration_date_required')}`;
                    }
                    return true;
                  },
                }}
              />
            </div>
          </div>
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
            {isEditMode ? tB('save') : tB('add')}
          </button>
        </div>
      </form>

      <div className={styles.formTab}>
        <ShipmentTabs
          currencies={currencies}
          tS={tS}
          tB={tB}
          fileDataArray={fileDataArray}
          invoices={invoiceArray}
          setFileDataArray={setFileDataArray}
          isEditMode={isEditMode}
          originalFiles={originalFiles}
          setIsFilesChanged={setIsFilesChanged}
          vendors={vendors}
        />
      </div>

      <Snackbar
        message={snackbarMessage}
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        duration={5000}
      />
    </>
  );
}
