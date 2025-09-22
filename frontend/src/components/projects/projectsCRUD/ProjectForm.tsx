'use client';

import styles from './project-form.module.css';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { ProjectDTO } from '@/api/types';
import { ensureDate } from '@/utils/helper';
import { useForm, Controller } from 'react-hook-form';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: ProjectDTO) => void;
  initialData?: ProjectDTO;
  title: string;
};

export default function ProjectForm({
  isOpen,
  onClose,
  title,
  initialData,
}: Props) {
  const projectFormDialogRef = useRef<HTMLDialogElement>(null);
  const tPj = useTranslations('Projects');
  const tCmn = useTranslations('Common');
  console.log('Initial Data:', initialData);
  const { control, register, reset, setFocus } = useForm<ProjectDTO>({
    defaultValues: {
      fullName: initialData?.fullName || '',
      displayName: initialData?.displayName || '',
      notes: initialData?.notes || '',
      status: initialData?.status || 'active',
      startDate: ensureDate(initialData?.startDate) || new Date(),
    },
  });

  useEffect(() => {
    reset({
      fullName: initialData?.fullName || '',
      displayName: initialData?.displayName || '',
      notes: initialData?.notes || '',
      status: initialData?.status || 'active',
      startDate: initialData?.startDate || new Date(),
    });
  }, [initialData, isOpen, reset]);

  useEffect(() => {
    const dialog = projectFormDialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
      setTimeout(() => {
        setFocus('fullName');
      });
    } else {
      dialog.close();
    }
  }, [isOpen, setFocus]);

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
          <input
            {...register('fullName')}
            type="text"
            name="fullName"
            id="fullName"
            required
            placeholder=" "
          />
          <label htmlFor="fullName">{tPj('form.title_label')}</label>
        </div>
        <div className={styles.outlinedField}>
          <input
            {...register('displayName')}
            type="text"
            name="displayName"
            id="displayName"
            required
            placeholder=" "
          />
          <label htmlFor="displayName">{tPj('form.display_name_label')}</label>
        </div>
        <div className={styles.outlinedField}>
          <textarea
            {...register('notes')}
            name="notes"
            id="notes"
            placeholder=" "
          ></textarea>
          <label htmlFor="notes">{tPj('form.description_label')}</label>
        </div>

        <div className={styles.rowFields}>
          <div className={styles.outlinedField}>
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="date"
                  id="startDate"
                  required
                  value={
                    field.value
                      ? new Date(field.value).toISOString().substring(0, 10)
                      : ''
                  }
                  onChange={e => field.onChange(e.target.value)}
                />
              )}
            />
            <label htmlFor="startDate">{tPj('form.start_date_label')}</label>
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
        </div>
        <button type="submit" className={styles.saveButton}>
          {tCmn('save')}
        </button>
      </form>
    </dialog>
  );
}
