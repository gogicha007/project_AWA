'use client';

import styles from './shipment-form.module.css';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useLocale } from 'next-intl';
import { enUS as enUSLocale, ka as kaLocale } from 'date-fns/locale';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/context/auth';
import { shipmentsApi } from '@/api/endpoints/shipments';
import convertToBase64 from '@/utils/file-utils';

const localeMap = {
  en: enUSLocale,
  ka: kaLocale,
};

type ShipmentFormValues = {
  alias: string;
  status: 'APPLIED' | 'DECLARED' | 'ARRIVED';
  declaration_number?: string;
  declaration_date?: Date;
  files?: Array<FileData>;
};

type FileData = {
  fileName: string;
  fileType: string;
  fileData: string;
};

export default function AddShipmentForm() {
  const tS = useTranslations('Logistics');
  const tB = useTranslations('Buttons');
  const localeCode = useLocale();
  const router = useRouter();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShipmentFormValues>();
  const { dbUserId } = useAuth();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [fileDataArray, setFileDataArray] = useState<FileData[]>([]);

  const submitHandler = async (data: ShipmentFormValues) => {
    try {
      if (dbUserId === null) {
        throw new Error('User ID is required to create a shipment.');
      }
      await shipmentsApi.create(
        {
          ...data,
          declaration_number: data.declaration_number ?? '',
          declaration_date: data.declaration_date ?? new Date(0),
          files: fileDataArray,
        },
        dbUserId
      );
    } catch (error) {
      console.error(error);
    }
    router.push('/shipments');
  };

  const handleCancel = () => {
    router.push('/shipments');
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const newFiles = Array.from(e.target.files);
    setSelectedFiles([...selectedFiles, ...newFiles]);

    // Convert files to base64
    const filesData = await Promise.all(
      newFiles.map(async (file) => {
        const base64 = await convertToBase64(file);
        return {
          fileName: file.name,
          fileType: file.type,
          fileData: base64,
        } as FileData;
      })
    );

    setFileDataArray([...fileDataArray, ...filesData]);
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
    setFileDataArray(fileDataArray.filter((_, i) => i !== index));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label className={styles.required} htmlFor="alias">
            {tS('form.alias_label')}
          </label>
          <input
            id="alias"
            className={styles.input}
            {...register('alias', { required: 'Alias is required' })}
            type="text"
          />
          {errors.alias && (
            <span className={styles.errorText}>{errors.alias.message}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.required} htmlFor="status">
            {tS('form.status_label')}
          </label>
          <select
            id="status"
            className={styles.input}
            {...register('status', { required: 'Status is required' })}
          >
            <option value="">Select status</option>
            <option value="APPLIED">Applied</option>
            <option value="DECLARED">Declared</option>
            <option value="ARRIVED">Arrived</option>
          </select>
          {errors.status && (
            <span className={styles.errorText}>{errors.status.message}</span>
          )}
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="declaration_number">
            {tS('form.declaration_number_label')}
          </label>
          <input
            id="declaration_number"
            className={styles.input}
            {...register('declaration_number')}
            type="text"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="declaration_date">
            {' '}
            {tS('form.declaration_date_label')}
          </label>
          <Controller
            control={control}
            name="declaration_date"
            render={({ field }) => (
              <DatePicker
                locale={localeMap[localeCode as 'en' | 'ka']}
                className={styles.input}
                selected={field.value ? new Date(field.value) : null}
                onChange={(date: Date | null) => {
                  if (!date) {
                    field.onChange('');
                    return;
                  }
                  const d = new Date(date);
                  d.setHours(12, 0, 0, 0);
                  field.onChange(d.toISOString().split('T')[0]);
                }}
                dateFormat="yyyy-MM-dd"
                placeholderText="yyyy-mm-dd"
              />
            )}
          />
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="files">{tS('form.files_label')}</label>
          <input
            id="files"
            type="file"
            className={styles.input}
            onChange={handleFileChange}
            accept=".pdf,.jpg,.jpeg,.png,.xlsx,.xls,.doc,.docx"
            multiple
          />

          {/* Display selected files */}
          {selectedFiles.length > 0 && (
            <div className={styles.filesList}>
              <h4>{tS('form.selected_files')}</h4>
              <ul>
                {selectedFiles.map((file, index) => (
                  <li key={index}>
                    {file.name}
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(index)}
                      className={styles.removeFileBtn}
                    >
                      ✖
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className={styles.formActions}>
        <button
          type="button"
          className={styles.cancelButton}
          onClick={handleCancel}
        >
          {tB('cancel')}
        </button>
        <button type="submit" className={styles.saveButton}>
          {tB('add')}
        </button>
      </div>
    </form>
  );
}
