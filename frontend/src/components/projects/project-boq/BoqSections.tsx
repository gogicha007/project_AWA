import React, { useState } from 'react';
import { ImportFile } from './components/ImportFile';
import SelectSheetName from './components/SelectSheetName';
import * as XLSX from 'xlsx';

export const BoqSections: React.FC<{ projectId: number }> = ({ projectId }) => {
  const [isSheetDialogOpen, setIsSheetDialogOpen] = useState(false);

  const processFile = (file: File) => {
    if (file.name.slice(-4).toString() === '.csv') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target!.result as string;
        try {
          const csv_file = XLSX.read(text, { type: 'string' });
          const sheetName = csv_file.SheetNames[0];
          const worksheet = csv_file.Sheets[sheetName];

          const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          console.log('CSV Data:', data);
        } catch {
          alert('Invalid SCV file format');
        }
      };
      reader.readAsText(file);
      console.log('this is csv file');
      return;
    }

    if (
      file.name.slice(-5).toString() === '.xlsx' ||
      file.name.slice(-4).toString() === '.xls'
    ) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target!.result as ArrayBuffer);
        try {
          const workbook = XLSX.read(data, { type: 'array' });
          console.log(workbook.SheetNames);
          if (!workbook.SheetNames.length) {
            alert('Invalid Excel file: No sheets found.');
            return;
          }
          console.log('valid Excel file', workbook);
        } catch {
          alert('Invalid Excel file format');
        }
      };
      reader.readAsArrayBuffer(file);

      setIsSheetDialogOpen(true);
      console.log('this is excel file');
    }
  };

  const closeSheetDialog = () => {
    setIsSheetDialogOpen(false);
  };

  return (
    <div className="flex flex-col items-start gap-4 p-6">
      <h2 className="text-lg font-semibold">
        Bill of Quantities (BoQ) for Project ID: {projectId}
      </h2>
      <ImportFile onFileSelect={processFile} />
      <SelectSheetName isOpen={isSheetDialogOpen} onClose={closeSheetDialog} />
    </div>
  );
};
