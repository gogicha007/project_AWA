'use client';

import styles from './project-form.module.css';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { ProjectDTO } from '@/api/types';
import { FieldErrors, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import projectSchema from './projectSchema';
import { z } from 'zod';
import ProjectDialogHeader from './form-components/dialog-header';
import ProjectDateComponent from './form-components/date-component';
import ProjectTextComponent from './form-components/text-component';
import ProjectTextAreaComponent from './form-components/textarea-component';
import ProjectErrorMessage from './form-components/error-message';
import { defaultProjectFormValues } from './utils/projectFormUtils';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: ProjectDTO) => void;
  initialData?: ProjectDTO;
  title: string;
};

export default function ProjectForm({
  isOpen,
  // onSave,
  onClose,
  title,
  initialData,
}: Props) {
  const projectFormDialogRef = useRef<HTMLDialogElement>(null);
  const tPj = useTranslations('Projects');
  const tCmn = useTranslations('Common');
  const {
    control,
    handleSubmit,
    register,
    reset,
    setFocus,
    formState: { errors },
  } = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: defaultProjectFormValues(initialData),
  });

  useEffect(() => {
    reset(defaultProjectFormValues(initialData));
  }, [initialData, reset]);

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

  const saveData = (data: z.infer<typeof projectSchema>) => {
    console.log('Saving data...', data);
    // onSave(data as ProjectDTO); // Uncomment to enable saving
  };

  const onError = (errors: FieldErrors<z.infer<typeof projectSchema>>) => {
    console.log('Form errors:', errors);
  };

  return (
    <dialog
      ref={projectFormDialogRef}
      className={styles.dialog}
      onClose={onClose}
    >
      <ProjectDialogHeader title={title} onClose={onClose} />
      <form onSubmit={handleSubmit(saveData, onError)} className={styles.form}>
        <div className={styles.formGroup}>
          <ProjectTextComponent
            register={register}
            name="fullName"
            label={tPj('form.title_label')}
          />
          <ProjectErrorMessage error={errors.fullName} />
        </div>
        <div className={styles.formGroup}>
          <ProjectTextComponent
            register={register}
            name="displayName"
            label={tPj('form.display_name_label')}
          />
          <ProjectErrorMessage error={errors.displayName} />
        </div>
        <div className={styles.formGroup}>
          <ProjectTextAreaComponent
            register={register}
            name="notes"
            label={tPj('form.description_label')}
          />
          <ProjectErrorMessage error={errors.notes} />
        </div>
        <div className={styles.rowFields}>
          <div className={styles.formGroup}>
            <ProjectDateComponent
              control={control}
              name="startDate"
              label={tPj('form.start_date_label')}
            />
            <ProjectErrorMessage error={errors.startDate} />
          </div>
          <div className={styles.formGroup}>
            <div className={styles.outlinedField}>
              <select {...register('status')} id="status" defaultValue="active">
                <option value="" disabled hidden></option>
                <option value="active">{tPj('status.active')}</option>
                <option value="completed">{tPj('status.completed')}</option>
                <option value="inProgress">{tPj('status.inProgress')}</option>
                <option value="onHold">{tPj('status.onHold')}</option>
              </select>
              <label htmlFor="status">{tPj('form.status_label')}</label>
            </div>
            <ProjectErrorMessage error={errors.status} />
          </div>
        </div>
        <button type="submit" className={styles.saveButton}>
          {tCmn('save')}
        </button>
      </form>
    </dialog>
  );
}
