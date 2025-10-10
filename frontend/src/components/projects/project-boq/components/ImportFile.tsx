import React, { useRef } from 'react';

type Props = {
  onFileSelect?: (file: File) => void;
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
      if (onFileSelect) {
        onFileSelect(file);
      }
    }
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleOnChange}
        accept=".xlsx, .csv"
        style={{ display: 'none' }}
      />
      <button
        className="rounded bg-blue-500 text-white"
        style={{ padding: '8px 16px' }}
        onClick={onChooseFile}
      >
        XLSX/CSV
      </button>
    </div>
  );
};
