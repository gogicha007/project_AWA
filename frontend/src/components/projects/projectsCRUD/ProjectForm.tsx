'use client';

import styles from './project-form.module.css';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { ProjectDTO } from '@/api/types';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: ProjectDTO) => void;
  initialData?: ProjectDTO;
  title: string;
};

export default function ProjectForm({ isOpen, onClose, title }: Props) {
  const projectFormDialogRef = useRef<HTMLDialogElement>(null);
  const tPj = useTranslations('Projects');
  const tCmn = useTranslations('Common');

  useEffect(() => {
    const dialog = projectFormDialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  return (
    <dialog ref={projectFormDialogRef} className={styles.dialog}>
      <div className={styles.dialogHeader}>
        <h2>{title}</h2>
        <button type="button" className={styles.closeButton} onClick={onClose}>
          ×
        </button>
      </div>
      <form className={styles.form}>
        <div className={styles.outlinedField}>
          <input type="text" name="full_name" id="full_name" required placeholder=" " />
          <label htmlFor="full_name">{tPj('form.title_label')}</label>
        </div>
        <div className={styles.outlinedField}>
          <input type="text" name="display_name" id="display_name" required placeholder=" " />
          <label htmlFor="display_name">{tPj('form.display_name_label')}</label>
        </div>
        <div className={styles.outlinedField}>
          <textarea name="description" id="description" required placeholder=" "></textarea>
          <label htmlFor="description">{tPj('form.description_label')}</label>
        </div>
        <div className={styles.outlinedField}>
          <select name="status" id="status" required defaultValue="active">
            <option value="" disabled hidden></option>
            <option value="active">{tPj('status.active')}</option>
            <option value="completed">{tPj('status.completed')}</option>
            <option value="inProgress">{tPj('status.inProgress')}</option>
            <option value="onHold">{tPj('status.onHold')}</option>
          </select>
          <label htmlFor="status">{tPj('form.status_label')}</label>
        </div>
        <div className={styles.rowFields}>
          <div className={styles.outlinedField}>
            <input type="date" name="start_date" id="start_date" required placeholder=" " />
            <label htmlFor="start_date">{tPj('form.start_date_label')}</label>
          </div>
          <div className={styles.outlinedField}>
            <input type="date" name="end_date" id="end_date" required placeholder=" " />
            <label htmlFor="end_date">{tPj('form.end_date_label')}</label>
          </div>
        </div>
        <button type="submit" className={styles.saveButton}>{tCmn('save')}</button>
      </form>
    </dialog>
  );
}
