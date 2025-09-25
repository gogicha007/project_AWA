import React from 'react';
import styles from './project-components.module.css';

import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

type SelectComponentProps<T extends FieldValues> = {
  options: { value: string; label: string }[];
  register: UseFormRegister<T>;
  name: Path<T>;
  label: string;
};
const ProjectSelectComponent = <T extends FieldValues>({
  options,
  register,
  name,
  label,
}: SelectComponentProps<T>) => {
  return (
    <div className={styles.outlinedField}>
      <select {...register(name)} id={name} defaultValue="">
        <option value="" disabled hidden>
          {label}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label htmlFor={name}>{label}</label>
    </div>
  );
};
export default ProjectSelectComponent;
