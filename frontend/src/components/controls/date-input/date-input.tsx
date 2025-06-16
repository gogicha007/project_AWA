import React from 'react';
import styles from './date-input.module.css';

import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { useLocale } from 'next-intl';
import DatePicker, { DatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DateInputProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  control: Control<T>;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
  locale?: DatePickerProps['locale'];
}

function DateInput<T extends FieldValues>({
  label,
  name,
  control,
  placeholder,
  locale,
}: DateInputProps<T>) {
  const loc = useLocale();
  console.log(loc);
  return (
    <div className={styles.formGroup}>
      <label htmlFor={name}>{label}</label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <DatePicker
            id={name}
            placeholderText={placeholder}
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
            className={styles.input}
            dateFormat="yyyy-MM-dd"
            locale={locale}
            autoComplete="off"
          />
        )}
      />
    </div>
  );
}

export default DateInput;

{
  /* <div className={styles.formGroup}>
  <label htmlFor="declaration_date"> {tS('form.declaration_date_label')}</label>
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
</div>; */
}
