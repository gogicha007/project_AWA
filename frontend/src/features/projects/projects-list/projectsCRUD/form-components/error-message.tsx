import React from 'react';
import styles from './project-components.module.css';
import { FieldError } from 'react-hook-form';

type Props = {
  error?: FieldError;
};

const ProjectErrorMessage = ({ error }: Props) => {
  if (typeof error?.message !== 'string') return null;
  return <p className={styles.errorMessage}>{error.message}</p>;
};

export default ProjectErrorMessage;
