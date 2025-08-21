'use client';

import styles from './page.module.css';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';

export default function ProjectForm() {
  const projectFormDialogRef = useRef<HTMLDialogElement>(null);
  const tPj = useTranslations('Projects');
  const tCmn = useTranslations('Common');

  return (
    <dialog ref={projectFormDialogRef} className={styles.dialog}>
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
