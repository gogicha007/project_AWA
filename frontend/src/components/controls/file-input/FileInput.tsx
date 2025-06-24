import styles from './file-input.module.css';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import convertToBase64 from '@/utils/file-utils';

export type FileData = {
  fileName: string;
  fileType: string;
  fileData: string;
};

interface FileInputProps {
  disabled: boolean;
  fileDataArray: FileData[];
  setFileDataArray: (files: FileData[]) => void;
  tS: (key: string) => string;
}
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

const FileInput: React.FC<FileInputProps> = ({
  disabled,
  fileDataArray,
  setFileDataArray,
  tS,
}) => {
  const {
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const newFiles = Array.from(e.target.files);

    const tooLarge = newFiles.find((file) => file.size > MAX_FILE_SIZE);
    if (tooLarge) {
      setError('files', {
        type: 'manual',
        message:
          tS('form.file_too_large') || 'File size must be less than 5 MB',
      });
      return;
    } else {
      clearErrors('files');
    }

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
    const updatedFiles = [...fileDataArray, ...filesData];
    setFileDataArray(updatedFiles);
    setValue('files', updatedFiles, { shouldValidate: true, shouldDirty: true});
  };

  const handleRemoveFile = (index: number) => {
    const restFiles = fileDataArray.filter((_, i) => i !== index);
    setFileDataArray(restFiles);
    setValue('files', restFiles);
  };

  return (
    <>
      <div className={styles.formGroup}>
        <label htmlFor="files">{tS('form.files_label')}</label>
        <input
          type="file"
          id="files"
          className={styles.input}
          disabled={disabled}
          onChange={handleFileChange}
          accept=".pdf,.jpg,.jpeg,.png,.xlsx,.xls,.doc,.docx"
          multiple
        />
      </div>
      <p className={styles.errorText}>
        {typeof errors.files?.message === 'string' ? errors.files.message : ''}
      </p>

      {fileDataArray.length > 0 && (
        <div className={styles.filesList}>
          <h4>{tS('form.selected_files')}</h4>
          <ul>
            {fileDataArray.map((file, index) => (
              <li key={index}>
                {file.fileName}
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
    </>
  );
};

export default FileInput;
