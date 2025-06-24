'use client';

import styles from './shipment-form.module.css';
import React, { useRef } from 'react';
import { useShipmentFormSet } from './hooks/useShipmentFormSet';
import Loader from '@/components/feedback/loader/loader';
import Snackbar from '@/components/feedback/snackbar/snackbar';
import GeneralInfoFields from './GeneralInfoFields';
import ShipmentTabs from './shipment-tabs';

export const ShipmentFormSet = ({ id }: { id?: number }) => {
  const genInfoFormRef = useRef<HTMLFormElement>(null);
  const {
    auxData,
    disableSubmitBtn,
    fileDataArray,
    handleCancel,
    handleEditSubmit,
    handleGenInfoSubmit,
    handleSnackbarClose,
    invoiceArray,
    isDirty,
    loading,
    FormProvider,
    formMethods,
    setFileDataArray,
    setInvoiceArray,
    shipmentId,
    snackbarOpen,
    snackbarStatus,
    tB,
    tS,
  } = useShipmentFormSet(id);

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
            {isDirty ? tB('cancel') : tS('actions.go_to_list')}
          </button>
          <button
            type="button"
            disabled={disableSubmitBtn}
            className={styles.saveButton}
            onClick={() => genInfoFormRef.current?.requestSubmit()}
          >
            {!!shipmentId ? tS('actions.edit') : tS('actions.add')}
          </button>
        </div>
      </div>
      <FormProvider {...formMethods}>
        <div className={styles.formSection}>
          <form
            ref={genInfoFormRef}
            className={styles.form}
            onSubmit={formMethods.handleSubmit(
              !!shipmentId ? handleEditSubmit : handleGenInfoSubmit
            )}
          >
            <GeneralInfoFields tS={tS} />
          </form>
        </div>
        <div className={styles.formSection}>
          <ShipmentTabs
            auxData={auxData}
            disabled={!!!shipmentId}
            fileDataArray={fileDataArray}
            setFileDataArray={setFileDataArray}
            invoiceArray={invoiceArray}
            setInvoiceArray={setInvoiceArray}
            tS={tS}
            tB={tB}
          />
        </div>
      </FormProvider>

      <Snackbar
        status={snackbarStatus}
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        duration={5000}
      />
    </div>
  );
};
