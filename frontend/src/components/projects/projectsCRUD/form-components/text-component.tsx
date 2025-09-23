import React from 'react';
import { UseFormRegister, FieldValues, Path } from 'react-hook-form';
import styles from './project-components.module.css';

type TextComponentProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  name: Path<T>;
  label: string;
};

const ProjectTextComponent = <T extends FieldValues>({
  register,
  name,
  label,
}: TextComponentProps<T>) => {
  return (
    <div className={styles.outlinedField}>
      <input {...register(name)} type="text" id={name} placeholder=" " />
      <label htmlFor={name}>{label}</label>
    </div>
  );
};
export default ProjectTextComponent;
