import styles from '../shipment-form.module.css';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import DateInput from '@/components/controls/date-input/date-input';

type Props = {
  tS: (key: string) => string;
};

const GeneralInfoFields = ({ tS }: Props) => {
  const {
    control,
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
            {...register('alias')}
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
          <select id="status" className={styles.input} {...register('status')}>
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
          <p className={styles.errorText}>
            {typeof errors.declaration_number?.message === 'string'
              ? errors.declaration_number.message
              : ''}
          </p>
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
    </>
  );
};

export default GeneralInfoFields;
