import React from 'react';
import styles from './add-button.module.css';
import { useTranslations } from 'next-intl';

interface AddButtonProps {
  label?: string;
  onAdd: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ label = '', onAdd }) => {
  const tA = useTranslations('TableActions');
  return (
    <>
      <button className={styles.addButton} onClick={() => onAdd()}>
        {label || tA('add')}
      </button>
    </>
  );
};

export default AddButton;
