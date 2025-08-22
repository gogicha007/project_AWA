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
        <div>
          <label>{tPj('form.title_label')}</label>
          <input type="text" name="title" />
        </div>
        <div>
          <label>{tPj('form.description_label')}</label>
          <textarea name="description"></textarea>
        </div>
        <div>
          <label>{tPj('form.status_label')}</label>
          <select name="status">
            <option value="active">{tPj('status.active')}</option>
            <option value="completed">{tPj('status.completed')}</option>
            <option value="inProgress">{tPj('status.inProgress')}</option>
            <option value="onHold">{tPj('status.onHold')}</option>
          </select>
        </div>
        <div>
          <label>{tPj('form.start_date_label')}</label>
          <input type="date" name="start_date" />
        </div>
        <div>
          <label>{tPj('form.end_date_label')}</label>
          <input type="date" name="end_date" />
        </div>
        <button type="submit">{tCmn('save')}</button>
      </form>
    </dialog>
  );
}
