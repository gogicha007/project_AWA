import styles from './shipment-form.module.css';
import React from 'react';
import { useFormContext } from 'react-hook-form';

type Props = {
  tS: (key: string) => string;
};

const GeneralInfoFields = ({ tS }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <>
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
          <p className={styles.errorText}>
            {typeof errors.alias?.message === 'string'
              ? errors.alias.message
              : ''}
          </p>
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
          <p className={styles.errorText}>
            {typeof errors.status?.message === 'string'
              ? errors.status.message
              : ''}
          </p>
        </div>
      </div>
    </>
  );
};

export default GeneralInfoFields;
