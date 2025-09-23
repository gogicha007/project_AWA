import React from "react";
import styles from './project-components.module.css';

type DialogHeaderProps = {
    title: string;
    onClose: () => void;
};
const ProjectDialogHeader = ({ title, onClose }: DialogHeaderProps) => {
  return (
    <div className={styles.dialogHeader}>
      <h2>{title}</h2>
      <button type="button" className={styles.closeButton} onClick={onClose}>
        ×
      </button>
    </div>
  );
};
export default ProjectDialogHeader;
