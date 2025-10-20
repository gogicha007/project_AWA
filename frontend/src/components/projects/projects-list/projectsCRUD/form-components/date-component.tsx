import React from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import styles from './project-components.module.css';

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
};

const ProjectDateComponent = <T extends FieldValues>({
  control,
  name,
  label,
}: Props<T>) => {
  return (
    <div className={styles.outlinedField}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const fieldValue = field.value as Date | string | null | undefined;

          return (
            <input
              type="date"
              id={name}
              value={
                fieldValue instanceof Date && !isNaN(fieldValue.getTime())
                  ? fieldValue.toISOString().substring(0, 10)
                  : ''
              }
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const dateValue = e.target.value;
                if (!dateValue) {
                  field.onChange(null);
                  return;
                }
                const d = new Date(dateValue);
                d.setHours(12, 0, 0, 0);
                field.onChange(d);
              }}
              onBlur={field.onBlur}
              name={field.name}
            />
          );
        }}
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );
};

export default ProjectDateComponent;
