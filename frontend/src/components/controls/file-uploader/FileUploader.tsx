import React, { useEffect } from 'react';
import styles from './file-uploader.module.css';
import convertToBase64 from '@/utils/file-utils';

export type FileData = {
  fileName: string;
  fileType: string;
  fileData: string;
};

interface FileUploaderProps {
  tS: (key: string) => string;
  fileDataArray: FileData[];
  setFileDataArray: (files: FileData[]) => void;
  isEditMode: boolean;
  originalFiles: FileData[];
  setIsFilesChanged: (changed: boolean) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  tS,
  fileDataArray,
  setFileDataArray,
  isEditMode,
  originalFiles,
  setIsFilesChanged,
}) => {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const newFiles = Array.from(e.target.files);

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
    setFileDataArray(fileDataArray.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const changed =
      isEditMode &&
      (fileDataArray.length !== originalFiles.length ||
        fileDataArray.some(
          (file, idx) =>
            file.fileName !== originalFiles[idx]?.fileName ||
            file.fileType !== originalFiles[idx]?.fileType
        ));
    setIsFilesChanged(changed);
  }, [fileDataArray, originalFiles, isEditMode, setIsFilesChanged]);

  return (
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
    </div>
  );
};

export default FileUploader;