'use client';

import { useRef, useEffect } from 'react';
import styles from '../form.module.css'
import { MaterialGroupDTO } from '@/api/types';
import { useTranslations } from 'next-intl';

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
  title,
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const tB = useTranslations('Buttons');
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
      name: formData.get('name') as string,
      description: formData.get('description') as string,
    });

    onClose();
  };

  return (
    <dialog ref={dialogRef} className={styles.dialog} onClose={onClose}>
      <div className={styles.dialogHeader}>
        <h2>{title}</h2>
        <button type="button" className={styles.closeButton} onClick={onClose}>
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
            {tB('cancel')}
          </button>
          <button type="submit" className={styles.saveButton}>
            {tB('save')}
          </button>
        </div>
      </form>
    </dialog>
  );
}
