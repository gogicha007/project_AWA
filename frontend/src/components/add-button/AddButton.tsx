import React from 'react';
import styles from './add-button.module.css';
import { useTranslations } from 'next-intl';

interface AddButtonProps {
  onAdd: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ onAdd }) => {
  const tA = useTranslations('TableActions');
  return (
    <>
      <button className={styles.addButton} onClick={() => onAdd()}>
        {tA('add')}
      </button>
    </>
  );
};

export default AddButton;
