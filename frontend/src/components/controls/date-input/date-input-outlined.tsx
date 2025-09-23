import React, { useState } from 'react';
import styles from './date-input-outlined.module.css';

import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form';
import DatePicker, { DatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { enUS as enUSLocale, ka as kaLocale } from 'date-fns/locale';
import { useLocale } from 'next-intl';

const localeMap = {
  en: enUSLocale,
  ka: kaLocale,
};

interface DateInputOutlinedProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  control: Control<T>;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
  locale?: DatePickerProps['locale'];
  rules?: RegisterOptions<T, Path<T>>;
  className?: string;

  value: Date | null;
  required?: boolean;
  id?: string;
  disabled?: boolean;
}

function DateInputOutlined<T extends FieldValues>({
  label,
  name,
  control,
  placeholder,
  rules,
  // className,
  value,
  // onChange,
  // required = false,
  // id,
  // disabled = false,
}: DateInputOutlinedProps<T>) {
  const [focused, setFocused] = useState(false);
  const localeCode = useLocale();

  return (
    <div
      className={`${styles['outlined-date-field']}${focused || value ? ' focused' : ''}`}
    >
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
                  field.onChange(null);
                  return;
                }
                const d = new Date(date);
                d.setHours(12, 0, 0, 0);
                field.onChange(d);
              }}
              className={styles['outlined-input']}
              dateFormat="yyyy-MM-dd"
              autoComplete="off"
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
            />
             {rules && <p className={styles.errorText}>{fieldState.error?.message}</p>}
          </>
        )}
      />
      <fieldset className={styles['outlined-date-fieldset']}>
        <legend>
          <span>{label}</span>
        </legend>
      </fieldset>
    </div>
  );
}

export default DateInputOutlined;
