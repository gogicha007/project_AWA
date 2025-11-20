'use client';

import styles from './location-form.module.css';
import { LocationSchema, LocationDTO } from '../../schema/locationSchema';
import { useEffect, useRef } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';

export type FormValues = Omit<LocationDTO, 'id'> & { id?: number };

type Props = {
  initialData?: LocationDTO;
  isOpen: boolean;
  locationId: number | null;
  onClose: () => void;
  onSave: (location: FormValues) => void;
};

const LocationForm = ({
  initialData,
  isOpen,
  locationId,
  onClose,
  onSave,
}: Props) => {
  const tVar = useTranslations('ProjectLocations');
  const dialogRef = useRef<HTMLDialogElement>(null);
  const {
    register,
    reset,
    setFocus,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(LocationSchema.partial({ id: true })),
    mode: 'onChange',
    defaultValues: {
      locationName: initialData?.locationName || '',
      latitude: initialData?.latitude || 0,
      longitude: initialData?.longitude || 0,
      notes: initialData?.notes || '',
    },
  });

  useEffect(() => {
    reset({
      locationName: initialData?.locationName || '',
      latitude: initialData?.latitude || 0,
      longitude: initialData?.longitude || 0,
      notes: initialData?.notes || '',
    });
  }, [initialData, isOpen, reset]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
      setTimeout(() => {
        setFocus('locationName');
      });
    } else {
      dialog.close();
    }
  }, [isOpen, setFocus]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      onSave({
        id: initialData?.id,
        locationName: data.locationName,
        latitude: data.latitude,
        longitude: data.longitude,
        notes: data.notes,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <dialog ref={dialogRef} className={styles.dialog} onClose={onClose}>
      <div className={styles.dialogHeader}>
        <h2>{locationId ? tVar('actions.edit') : tVar('actions.create')}</h2>
        <button type="button" className={styles.closeButton} onClick={onClose}>
          ×
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.form_item}>
          <label htmlFor="locationName">{tVar('fields.locationName')}:</label>
          <input
            {...register('locationName')}
            type="text"
            id="locationName"
            className={styles.input}
          />
          {errors.locationName && (
            <p className={styles.error}>{errors.locationName.message}</p>
          )}
        </div>
        <div className={styles.form_item}>
          <label htmlFor="notes">{tVar('fields.notes')}:</label>
          <textarea
            {...register('notes', { required: false })}
            id="notes"
            name="notes"
            rows={3}
            className={styles.textarea}
          />
          {errors.notes && (
            <p className={styles.error}>{errors.notes.message}</p>
          )}
        </div>
        <div className={styles.formActions}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onClose}
          >
            {tVar('actions.cancel')}
          </button>
          <button
            type="submit"
            className={styles.saveButton}
            disabled={isSubmitting || !isValid}
          >
            {isSubmitting
              ? tVar('actions.saving')
              : locationId
                ? tVar('actions.update')
                : tVar('actions.save')}
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default LocationForm;
