'use client';

import styles from './project-form.module.css';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { ProjectDTO, CurrencyDTO } from '@/api/types';
import { FieldErrors, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import projectSchema from './projectSchema';
import ProjectDialogHeader from './form-components/dialog-header';
import ProjectDateComponent from './form-components/date-component';
import ProjectTextComponent from './form-components/text-component';
import ProjectTextAreaComponent from './form-components/textarea-component';
import ProjectErrorMessage from './form-components/error-message';
import ProjectSelectComponent from './form-components/select-component';
import { defaultProjectFormValues } from './utils/projectFormUtils';
import { PROJECT_STATUSES } from '@/constants/projectStatus';

type Props = {
  currencies: CurrencyDTO[];
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: ProjectDTO) => void;
  initialData?: ProjectDTO;
  title: string;
};

export default function ProjectForm({
  currencies,
  isOpen,
  onSave,
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

  const statusOptions = () => {
    return PROJECT_STATUSES.map((status) => ({
      value: status,
      label: tPj(`status.${status}`),
    }));
  };

  useEffect(() => {
    if (isOpen) reset(defaultProjectFormValues(initialData));
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
      <form
        key={isOpen ? 'open' : 'closed'}
        onSubmit={handleSubmit(onSave, onError)}
        className={styles.form}
      >
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
            <ProjectDateComponent
              control={control}
              name="endDate"
              label={tPj('form.end_date_label')}
            />
            <ProjectErrorMessage error={errors.endDate} />
          </div>
        </div>
        <div className={styles.rowFields}>
          <div className={styles.formGroup}>
            <ProjectSelectComponent
              options={statusOptions()}
              register={register}
              name="status"
              label={tPj('form.status_label')}
            />
            <ProjectErrorMessage error={errors.status} />
          </div>
          <div className={styles.formGroup}>
            <ProjectSelectComponent
              options={currencies.map((currency) => ({
                value: (currency.id as number).toString(),
                label: currency.code,
              }))}
              register={register}
              name="currencyId"
              label={tPj('form.currency_label')}
              />
            <ProjectErrorMessage error={errors.currencyId} />
          </div>
        </div>
        <button type="submit" className={styles.saveButton}>
          {tCmn('save')}
        </button>
      </form>
    </dialog>
  );
}
