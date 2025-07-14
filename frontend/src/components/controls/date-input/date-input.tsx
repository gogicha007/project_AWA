import React from 'react';
import styles from './date-input.module.css';

import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form';
import { useLocale } from 'next-intl';
import DatePicker, { DatePickerProps } from 'react-datepicker';
import { enUS as enUSLocale, ka as kaLocale } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';

const localeMap = {
  en: enUSLocale,
  ka: kaLocale,
};

interface DateInputProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  control: Control<T>;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
  locale?: DatePickerProps['locale'];
  rules?: RegisterOptions<T, Path<T>>;
  className?: string
}

function DateInput<T extends FieldValues>({
  label,
  name,
  control,
  placeholder,
  rules,
  className
}: DateInputProps<T>) {
  const localeCode = useLocale();
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field, fieldState }) => (
          <>
            <DatePicker
              locale={localeMap[localeCode as 'en' | 'ka']}
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
              className={className ?? styles.input}
              dateFormat="yyyy-MM-dd"
              autoComplete="off"
            />
            {rules && <p className={styles.errorText}>{fieldState.error?.message}</p>}
          </>
        )}
      />
    </>
  );
}

export default DateInput;