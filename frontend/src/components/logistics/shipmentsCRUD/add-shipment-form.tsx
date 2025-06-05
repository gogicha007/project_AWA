'use client';

import styles from './shipment-form.module.css';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useLocale } from 'next-intl';
import { enUS as enUSLocale, ka as kaLocale } from 'date-fns/locale';

const localeMap = {
  en: enUSLocale,
  ka: kaLocale,
};

type ShipmentFormValues = {
  alias: string;
  status: 'APPLIED' | 'DECLARED' | 'ARRIVED';
  declaration_number?: string;
  declaration_date?: string;
};

export default function AddShipmentForm() {
  const localeCode = useLocale();
  const router = useRouter();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShipmentFormValues>();

  const submitHandler = async (data: ShipmentFormValues) => {
    console.log(data);
    // TODO: Replace with your API call
    // await fetch('/api/shipments', { method: 'POST', body: JSON.stringify(data) });
    router.push('/shipments');
  };

  const handleCancel = () => {
    router.push('/shipments');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label className={styles.required} htmlFor="alias">
            Alias
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
            Status
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
          <label htmlFor="declaration_number">Declaration Number</label>
          <input
            id="declaration_number"
            className={styles.input}
            {...register('declaration_number')}
            type="text"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="declaration_date">Declaration Date</label>
          <Controller
            control={control}
            name="declaration_date"
            render={({ field }) => (
              <DatePicker
                locale={localeMap[localeCode as 'en' | 'ka']}
                className={styles.input}
                selected={field.value ? new Date(field.value) : null}
                onChange={(date: Date | null) =>
                  field.onChange(date ? date.toISOString().split('T')[0] : '')
                }
                dateFormat="yyyy-MM-dd"
                placeholderText="yyyy-mm-dd"
              />
            )}
          />
        </div>
      </div>

      <div className={styles.formActions}>
        <button
          type="button"
          className={styles.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button type="submit" className={styles.saveButton}>
          Add
        </button>
      </div>
    </form>
  );
}
