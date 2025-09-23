import React, { useState } from 'react';
import { UseFormRegister, FieldValues, Path } from 'react-hook-form';
import styles from './project-components.module.css';

type TextComponentProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  name: Path<T>;
  label: string;
};

const ProjectTextAreaComponent = <T extends FieldValues>({
  register,
  name,
  label,
}: TextComponentProps<T>) => {
  const [value, setValue] = useState('');

  return (
    <div className={styles.outlinedField}>
      <textarea
        {...register(name)}
        id={name}
        placeholder=" "
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={value ? styles.filled : ''}
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );
};
export default ProjectTextAreaComponent;
