import React from "react";
import styles from './project-components.module.css';

type SelectComponentProps = {
    options?: { value: string; label: string }[];
};
const ProjectSelectComponent = ({ options }: SelectComponentProps) => {
  return (
    <div className={styles.outlinedField}>
      <select>
        <option value="" disabled hidden>
          Select an option
        </option>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
export default ProjectSelectComponent;