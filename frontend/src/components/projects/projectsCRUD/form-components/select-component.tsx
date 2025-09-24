import React from 'react';
import styles from './project-components.module.css';

import { PROJECT_STATUSES } from '@/constants/projectStatus';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

type SelectComponentProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  name: Path<T>;
  label: string;
  tVar: (key: string) => string;
};
const ProjectSelectComponent = <T extends FieldValues>({
  register,
  name,
  label,
  tVar,
}: SelectComponentProps<T>) => {
  return (
    <div className={styles.outlinedField}>
      <select {...register(name)} id={name} defaultValue="">
        <option value="" disabled hidden>
          {label}
        </option>
        {PROJECT_STATUSES.map((option) => (
          <option key={option} value={option}>
            {tVar(`status.${option}`)}
          </option>
        ))}
      </select>
      <label htmlFor={name}>{label}</label>
    </div>
  );
};
export default ProjectSelectComponent;
