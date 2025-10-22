import React, { useRef } from 'react';
import { processFile, ProcessedFileData } from '../utils/ProcessFile';

type Props = {
  onFileSelect?: (processedData: ProcessedFileData) => void;
};

export const ImportFile: React.FC<Props> = ({ onFileSelect }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onChooseFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      processFile(file, (processedData) => {
        if (onFileSelect) {
          onFileSelect(processedData);
        }
      });
    }
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleOnChange}
        accept=".xlsx, .xls, .csv"
        style={{ display: 'none' }}
      />
      <button
        className="rounded bg-blue-500 text-white"
        style={{ padding: '8px 16px' }}
        onClick={onChooseFile}
      >
        XLSX/CSV
      </button>
      <button
        className="rounded bg-green-500 text-white"
        style={{ padding: '8px 16px', marginLeft: '8px' }}
        onClick={() => {
          alert('Clipboard import not implemented yet');
        }}
      >
        Clipboard
      </button>
    </div>
  );
};
