import { useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styles from './form.module.css';
import { MaterialNameDTO, MaterialTypeDTO } from '@/api/types';
import { useTranslations } from 'use-intl';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (materialName: MaterialNameDTO) => void;
  initialData?: MaterialNameDTO;
  title: string;
  tVar: (key: string) => string;
  materialTypes: MaterialTypeDTO;
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

  const { register, handleSubmit, reset, setFocus } = useForm<FormValues>({
    defaultValues: {
      name: initialData?.name || '',
      dn: initialData?.dn || '',
      pn: initialData?.pn || '',
      materialType:
        initialData?.typeId !== undefined ? String(initialData.typeId) : '',
      description: initialData?.description || '',
    },
  });

  useEffect(() => {
    reset({
      name: initialData?.name || '',
      dn: initialData?.dn || '',
      pn: initialData?.pn || '',
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
      typeId: parseInt(data.materialType || '0', 10),
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
          <label htmlFor="materialType"></label>
        </div>
      </form>
    </dialog>
  );
}
