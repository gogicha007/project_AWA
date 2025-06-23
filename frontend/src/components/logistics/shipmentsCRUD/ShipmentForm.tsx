'use client';

import styles from './shipment-form.module.css';
import React, { useRef } from 'react';
import GeneralInfoFields from './GeneralInfoFields';
import { useShipmentFormSet } from './hooks/useShipmentFormSet';
import Loader from '@/components/feedback/loader/loader';

export const ShipmentFormSet = () => {
  const genInfoFormRef = useRef<HTMLFormElement>(null);
  const {
    handleCancel,
    isEditMode,
    loading,
    FormProvider,
    formMethods,
    submitGenInfo,
    tB,
    tS,
  } = useShipmentFormSet();

  if (loading) return <Loader />;

  return (
    <div className={styles.formContainer}>
      <div className={styles.formHeader}>
        <h2>{tS('title')}</h2>
        <div className={styles.formActions}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={handleCancel}
          >
            {tB('cancel')}
          </button>
          <button
            type="button"
            // disabled={disableSubmitBtn}
            className={styles.saveButton}
            onClick={() => genInfoFormRef.current?.requestSubmit()}
          >
            {isEditMode ? tS('actions.edit') : tS('actions.add')}
          </button>
        </div>
      </div>
      <FormProvider {...formMethods}>
        <div className={styles.formSection}>
          <form
            ref={genInfoFormRef}
            className={styles.form}
            onSubmit={formMethods.handleSubmit(submitGenInfo)}
          >
            <GeneralInfoFields tS={tS} />
          </form>
        </div>
      </FormProvider>
    </div>
  );
};
