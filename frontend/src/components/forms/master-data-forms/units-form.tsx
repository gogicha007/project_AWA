'use client';

import { useRef, useEffect } from 'react';
import styles from '../form.module.css';
import { UnitDTO } from '@/api/types';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (unit: UnitDTO) => void;
  initialData?: UnitDTO;
  title: string;
};

export default function UnitDialog({ 
  isOpen, 
  onClose, 
  onSave, 
  initialData, 
  title 
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    
    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    onSave({
      id: initialData?.id,
      unit: formData.get('name') as string,
    });
    
    onClose();
  };

  return (
    <dialog 
      ref={dialogRef} 
      className={styles.dialog}
      onClose={onClose}
    >
      <div className={styles.dialogHeader}>
        <h2>{title}</h2>
        <button 
          type="button" 
          className={styles.closeButton}
          onClick={onClose}
        >
          ×
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Unit:</label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={initialData?.unit || ''}
            required
            className={styles.input}
          />
        </div>
        
        <div className={styles.formActions}>
          <button 
            type="button" 
            className={styles.cancelButton}
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className={styles.saveButton}
          >
            Save
          </button>
        </div>
      </form>
    </dialog>
  );
}