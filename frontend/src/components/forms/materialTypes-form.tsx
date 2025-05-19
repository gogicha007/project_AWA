'use client';

import { useRef, useEffect } from 'react';
import styles from './form.module.css';
import { MaterialTypeDTO } from '@/api/types';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (materialType: MaterialTypeDTO) => void;
  initialData?: MaterialTypeDTO;
  title: string;
};

export default function MaterialTypeDialog({ 
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
      type: formData.get('name') as string,
      groupId: parseInt(formData.get('materialGroupId') as string || '0', 10)
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
        <div className={styles.formType}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={initialData?.type || ''}
            required
            className={styles.input}
          />
        </div>
        
        <div className={styles.formType}>
          <label htmlFor="materialGroupId">Description:</label>
          <input
            id="materialGroupId"
            name="materialGroupId"
            defaultValue={initialData?.groupId || ''}
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
  );}