'use client';

import styles from './shipment-form.module.css';
import React, { useRef } from 'react';
import GeneralInfoFields from './GeneralInfoFields';
import { useShipmentFormSet } from './hooks/useShipmentFormSet';
import Loader from '@/components/feedback/loader/loader';

export const ShipmentFormSet = () => {
  const genInfoFormRef = useRef<HTMLFormElement>(null);
  const { loading, FormProvider, formMethods, submitGenInfo, tS } =
    useShipmentFormSet();

  if (loading) return <Loader />;

  return (
    <div className={styles.formContainer}>
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
