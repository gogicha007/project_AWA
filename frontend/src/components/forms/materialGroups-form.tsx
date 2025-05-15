'use client';

import { useRef, useEffect } from 'react';
import styles from './form.module.css';
import { MaterialGroupDTO } from '@/api/types';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (materialGroup: MaterialGroupDTO) => void;
  initialData?: MaterialGroupDTO;
  title: string;
};

export default function MaterialGroupDialog({ 
  isOpen, 
  onClose, 
  onSave, 
  initialData, 
  title 
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  
  // Handle open/close
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    
    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  // Form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    onSave({
      id: initialData?.id,
      name: formData.get('name') as string,
      description: formData.get('description') as string,
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
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={initialData?.name || ''}
            required
            className={styles.input}
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            defaultValue={initialData?.description || ''}
            rows={3}
            className={styles.textarea}
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