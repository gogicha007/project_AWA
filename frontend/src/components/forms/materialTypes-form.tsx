'use client';

import { useRef, useEffect } from 'react';
import styles from './form.module.css';
import { MaterialGroupDTO, MaterialTypeDTO } from '@/api/types';
import { useTranslations } from 'next-intl';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (materialType: MaterialTypeDTO) => void;
  initialData?: MaterialTypeDTO;
  title: string;
  tVar: (key: string) => string;
  materialGroups: Omit<MaterialGroupDTO, 'description'>[];
};

export default function MaterialTypeDialog({
  isOpen,
  onClose,
  onSave,
  initialData,
  title,
  tVar,
  materialGroups,
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
      type: formData.get('name') as string,
      groupId: parseInt((formData.get('materialGroup') as string) || '0', 10),
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
        <div className={styles.formType}>
          <label htmlFor="name">{`${tVar('material_types.form.type_label')}:`}</label>
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
          <label htmlFor="materialGroup">{`${tVar('material_types.form.group_label')}:`}</label>
          <select
            id="materialGroup"
            name="materialGroup"
            defaultValue={initialData?.groupId || ''}
            className={styles.input}
          >
            {materialGroups.map((group) => (
              <option key={group.id} value={group.name}>
                {group.name}
              </option>
            ))}
          </select>
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
