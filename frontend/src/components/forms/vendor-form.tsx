import styles from './form.module.css';
import { useRef, useEffect } from 'react';
import { VendorDTO } from '@/api/types';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (vendor: VendorDTO) => void;
  initialData?: VendorDTO;
  title: string;
  tVar: (key: string) => string;
};

type FormValues = VendorDTO;

export default function VendorDialog({
  isOpen,
  onClose,
  onSave,
  initialData,
  title,
  tVar,
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const tB = useTranslations('Buttons');

  const { register, handleSubmit, reset, setFocus } = useForm<FormValues>({
    defaultValues: {
      alias: initialData?.alias || '',
      name: initialData?.name || '',
      address: initialData?.address || '',
      country: initialData?.country || '',
    },
  });

  useEffect(() => {
    reset({
      alias: initialData?.alias || '',
      name: initialData?.name || '',
      address: initialData?.address || '',
      country: initialData?.country || '',
    });
  }, [initialData, isOpen, reset]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
      setTimeout(() => {
        setFocus('alias');
      });
    } else {
      dialog.close();
    }
  }, [isOpen, setFocus]);

  const onSubmit = (data: FormValues) => {
    onSave({
      id: initialData?.id,
      alias: data.alias,
      name: data.name,
      address: data.address,
      country: data.country,
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
          <label htmlFor="alias">{`${tVar('form.alias_label')}`}</label>
          <input
            {...register('alias', { required: true })}
            type="text"
            id="alias"
            className={styles.input}
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
