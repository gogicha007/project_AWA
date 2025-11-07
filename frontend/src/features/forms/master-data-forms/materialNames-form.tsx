import { useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styles from '../form.module.css';
import { MaterialNameDTO, MaterialTypeDTO } from '@/api/types';
import { useTranslations } from 'use-intl';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (materialName: MaterialNameDTO) => void;
  initialData?: MaterialNameDTO;
  title: string;
  tVar: (key: string) => string;
  materialTypes: Omit<MaterialTypeDTO, 'groupId'>[];
};

interface FormValues extends Omit<MaterialNameDTO, 'typeId'> {
  materialType: string;
}

export default function MaterialNameDialog({
  isOpen,
  onClose,
  onSave,
  initialData,
  title,
  tVar,
  materialTypes,
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const tB = useTranslations('Buttons');

  const { register, handleSubmit, reset, setFocus, watch, setValue } =
    useForm<FormValues>({
      defaultValues: {
        name: initialData?.name || '',
        dn: initialData?.dn || '',
        pn: initialData?.pn || '16',
        materialType:
          initialData?.typeId !== undefined ? String(initialData.typeId) : '',
        description: initialData?.description || '',
      },
    });

  const materialType = watch('materialType');
  const dn = watch('dn');
  const pn = watch('pn');
  const degree = watch('degree');

  const selectedType =
    materialTypes.find((type) => String(type.id) === materialType)?.type || '';

  useEffect(() => {
    const dnStr = dn ? `DN${dn}` : '';
    const pnStr = pn ? `PN${pn}` : '';
    const degreeStr = degree ? `${degree}*` : '';
    const composedName = [selectedType, dnStr, pnStr, degreeStr]
      .filter(Boolean)
      .join(' ');
    setValue('name', composedName);
  }, [selectedType, dn, pn, degree, setValue]);

  useEffect(() => {
    reset({
      name: initialData?.name || '',
      dn: initialData?.dn || '',
      pn: initialData?.pn || '16',
      materialType:
        initialData?.typeId !== undefined ? String(initialData.typeId) : '',
      description: initialData?.description || '',
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
      name: data.name,
      dn: data.dn,
      pn: data.pn,
      // degree: data.degree,
      degree: parseInt(
        data.degree !== undefined ? String(data.degree) : '0',
        10
      ),
      typeId: parseInt(data.materialType || '0', 10),
      description: data.description,
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
        <div className={styles.form_item}>
          <label htmlFor="materialType">{`${tVar('material_names.form.type_label')}`}</label>
          <select
            {...register('materialType', { required: true })}
            id="materialType"
            className={styles.input}
          >
            <option value="">
              {tVar('material_names.form.type_placeholder') || '-- Select --'}
            </option>
            {materialTypes.map((type) => (
              <option key={type.id} value={String(type.id)}>
                {type.type}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.form_item}>
          <label htmlFor="dn">{`${tVar('material_names.form.dn_label')}`}</label>
          <input
            {...register('dn', { required: true })}
            type="text"
            id="dn"
            className={styles.input}
            required
          />
        </div>
        <div className={styles.form_item}>
          <label htmlFor="pn">{`${tVar('material_names.form.pn_label')}`}</label>
          <input
            {...register('pn', { required: true })}
            type="text"
            id="pn"
            className={styles.input}
            required
          />
        </div>
        <div>
          <label htmlFor="degree">{`${tVar('material_names.form.degree_label')}`}</label>
          <input
            {...register('degree', { required: false })}
            type="number"
            id="degree"
            className={styles.input}
          />
        </div>
        <div className={styles.form_item}>
          <label htmlFor="name">{`${tVar('material_names.form.name_label')}`}</label>
          <input
            {...register('name', { required: true })}
            type="text"
            id="name"
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description">{`${tVar('material_names.form.description_label')}:`}</label>
          <textarea
            {...register('description', { required: false })}
            id="description"
            name="description"
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
