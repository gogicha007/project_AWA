import React, { useRef, useState } from 'react';
import { processFile, ProcessedFileData } from '../../utils/ProcessFile';
import { processClipboard } from '../../utils/ProcessClipboard';
import SelectSheetName from './SelectSheetName';
import Snackbar from '@/components/feedback/snackbar/snackbar';
import { useTranslations } from 'next-intl';
import * as XLSX from 'xlsx';
import Identifycolumns from './identify-columns/IdentifyColumns';

export type ImportedDataType = {
  [key: string]: string | number;
};

type Props = {
  onData?: (data: ImportedDataType[]) => void;
  onError?: (error: string | null) => void;
};

export const ImportData: React.FC<Props> = (props) => {
  const tID = useTranslations('ProjectBoq.import_data');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [dataRows, setDataRows] = useState<unknown[]>([]);
  const [importError, setImportError] = useState<string | null>(null);
  const [isSheetNamesDialogOpen, setIsSheetNamesDialogOpen] = useState(false);
  const [isIdentifyColsDialogOpen, setIsIdentifyColsDialogOpen] =
    useState(false);
  const [processingClipboard, setProcessingClipboard] = useState(false);
  const [selectedData, setSelectedData] = useState<ProcessedFileData | null>(
    null
  );
  const [selectedSheetName, setSelectedSheetName] = useState('');
  const [sheetNames, setSheetNames] = useState<string[] | null>(null);

  const closeIdentifyColsDialog = () => {
    setIsIdentifyColsDialogOpen(false);
  };

  const closeSheetDialog = () => {
    setIsSheetNamesDialogOpen(false);
    setSheetNames(null);
  };

  // handle selected sheet
  const handleSelectedSheet = (sheetName: string) => {
    closeSheetDialog();
    const wb = selectedData?.data as XLSX.WorkBook;
    const wsh = wb.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(wsh, { header: 1 });
    setSelectedSheetName(sheetName);
    setDataRows(rows);
    setIsIdentifyColsDialogOpen(true);
  };

  const handleData = (data: ProcessedFileData) => {
    // Set selected data FIRST before processing
    setSelectedData(data);

    if (
      data.type === 'xlsx' &&
      data.data &&
      typeof data.data === 'object' &&
      'Sheets' in data.data
    ) {
      const workbook = data.data as XLSX.WorkBook;
      const sheetNamesArr = workbook.SheetNames;

      if (sheetNamesArr.length > 1) {
        setIsSheetNamesDialogOpen(true);
        setSheetNames(sheetNamesArr);
      } else {
        const wsh = workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(wsh, { header: 1 });
        setSelectedSheetName(workbook.SheetNames[0]);
        setDataRows(rows);
        setIsIdentifyColsDialogOpen(true);
      }
    }
    if (data.type === 'csv') {
      console.log('csv data', data);
    }
  };

  // handle file input
  const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      processFile(
        file,
        (processedData) => {
          handleData(processedData);
          setImportError(null);
        },
        (error) => {
          setImportError(error);
          setSelectedData(null);
        }
      );
      event.target.value = '';
    }
  };

  // handle file input - calls handleFile function
  const onChooseFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // handle clipboard
  const onChooseClipboard = async () => {
    if (processingClipboard) return;
    setProcessingClipboard(true);
    setImportError(null); // Clear any previous errors

    processClipboard({
      handleData,
      setProcessingClipboard,
      setSelectedData,
      setImportError,
    });
  };

  return (
    <div className="flex items-center gap-3">
      <h3>{tID('title')} </h3>

      {/* handle file input*/}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFile}
        accept=".xlsx, .xls"
        style={{ display: 'none' }}
      />
      <button
        className="rounded bg-blue-500 text-xs text-white"
        style={{ padding: '4px 8px' }}
        onClick={onChooseFile}
      >
        XLSX/XLS
      </button>

      {/* handle clipboard */}
      <button
        className="rounded bg-green-500 text-xs text-white"
        style={{ padding: '4px 8px' }}
        onClick={onChooseClipboard}
      >
        {tID('clipboard')}
      </button>
      <Identifycolumns
        isOpen={isIdentifyColsDialogOpen}
        onClose={closeIdentifyColsDialog}
        rows={dataRows}
        sheetName={selectedSheetName}
        onData={props.onData}
      />
      <SelectSheetName
        isOpen={isSheetNamesDialogOpen}
        onClose={closeSheetDialog}
        sheetNames={sheetNames}
        onSelect={handleSelectedSheet}
      />
      <Snackbar
        status={{ message: importError as string, success: false }}
        open={!!importError}
        onClose={() => setImportError(null)}
      />
    </div>
  );
};
