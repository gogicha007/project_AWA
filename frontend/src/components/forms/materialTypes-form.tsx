import { useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
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

type FormValues = {
  name: string;
  materialGroup: string;
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

  const { register, handleSubmit, reset, setFocus } = useForm<FormValues>({
    defaultValues: {
      name: initialData?.type || '',
      materialGroup:
        initialData?.groupId !== undefined ? String(initialData.groupId) : '',
    },
  });

  useEffect(() => {
    reset({
      name: initialData?.type || '',
      materialGroup:
        initialData?.groupId !== undefined ? String(initialData.groupId) : '',
    });
  }, [initialData, isOpen, reset]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
      setTimeout(() => {
        setFocus('name');
      });
    } else {
      dialog.close();
    }
  }, [isOpen, setFocus]);

  const onSubmit = (data: FormValues) => {
    onSave({
      id: initialData?.id,
      type: data.name,
      groupId: parseInt(data.materialGroup || '0', 10),
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

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formType}>
          <label htmlFor="name">{`${tVar('material_types.form.type_label')}:`}</label>
          <input
            {...register('name', { required: true })}
            type="text"
            id="name"
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formType}>
          <label htmlFor="materialGroup">{`${tVar('material_types.form.group_label')}:`}</label>
          <select
            {...register('materialGroup', { required: true })}
            id="materialGroup"
            className={styles.input}
          >
            <option value="">
              {tVar('material_types.form.group_placeholder') || '-- Select --'}
            </option>
            {materialGroups.map((group) => (
              <option key={group.id} value={String(group.id)}>
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
