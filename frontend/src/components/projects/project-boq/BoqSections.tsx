import React, { useEffect, useState } from 'react';
import { ImportData } from './components/ImportData';
import SelectSheetName from './components/SelectSheetName';
import { ProcessedFileData } from './utils/ProcessFile';
import { SectionsGrid } from './components/SectionsGrid';
import * as XLSX from 'xlsx';

export const BoqSections: React.FC<{ projectId: number }> = ({ projectId }) => {
  const [isSheetNamesDialogOpen, setIsSheetNamesDialogOpen] = useState(false);
  const [sheetNames, setSheetNames] = useState<string[] | null>(null);
  const [selectedData, setSelectedData] = useState<ProcessedFileData | null>(
    null
  );
  const [importError, setImportError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedData) handleData(selectedData);
    if (importError) {
      console.error(importError), setImportError(null);
    }
  }, [selectedData, importError]);

  const handleData = (data: ProcessedFileData) => {
    if (
      data.type === 'xlsx' &&
      data.data &&
      typeof data.data === 'object' &&
      'Sheets' in data.data
    ) {
      const workbook = data.data as XLSX.WorkBook;
      const sheetNamesArr = workbook.SheetNames;
      const sheetName = workbook.SheetNames[8];
      const worksheet = workbook.Sheets[sheetName];
      const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const objects = XLSX.utils.sheet_to_json(worksheet);
      console.log('workbook', workbook);
      console.log('sheet Names', sheetNamesArr);
      console.log('sheetName', sheetName);
      console.log('work sheet', worksheet);
      console.log('excel rows', rows);
      console.log('excel objects', objects);
      if (sheetNamesArr.length > 1) {
        setIsSheetNamesDialogOpen(true);
        setSheetNames(sheetNamesArr);
      }
    }
    if (data.type === 'csv') {
      console.log('csv data', data);
    }
  };

  const handleSelectedSheet = (sheetName: string) => {
    const workBook = selectedData?.data as XLSX.WorkBook
    
    console.log('sheet name', sheetName);
    closeSheetDialog();
  };

  const closeSheetDialog = () => {
    setIsSheetNamesDialogOpen(false);
    setSheetNames(null);
  };

  return (
    <div className="flex flex-col items-start gap-4 p-6">
      <h2 className="text-lg font-semibold">
        Bill of Quantities (BoQ) for Project ID: {projectId}
      </h2>
      <ImportData onData={setSelectedData} onError={setImportError} />
      <SectionsGrid />
      <SelectSheetName
        isOpen={isSheetNamesDialogOpen}
        onClose={closeSheetDialog}
        sheetNames={sheetNames}
        onSelect={handleSelectedSheet}
      />
    </div>
  );
};
