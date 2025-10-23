import React, { useRef, useState } from 'react';
import { processFile, ProcessedFileData } from '../utils/ProcessFile';
import { processClipboard } from '../utils/ProcessClipboard';
import * as XLSX from 'xlsx';

type Props = {
  onData: (processedData: ProcessedFileData | null) => void;
  onError: (error: string | null) => void;
};

export const ImportData: React.FC<Props> = ({ onData, onError }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [processingClipboard, setProcessingClipboard] = useState(false);

  // handle file input
  const onChooseFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      processFile(
        file,
        (processedData) => {
          onData(processedData);
          onError(null);
        },
        (error) => {
          onError(error), onData(null);
        }
      );
    }
  };

  // handle clipboard
  const onChooseClipboard = async () => {
    if (processingClipboard) return;
    setProcessingClipboard(true);

    processClipboard({setProcessingClipboard, onData, onError});
  
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFile}
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
        onClick={onChooseClipboard}
      >
        Clipboard
      </button>
    </div>
  );
};
