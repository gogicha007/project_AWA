import React, { useEffect, useState } from 'react';
import { ImportData } from './components/ImportData';
import SelectSheetName from './components/SelectSheetName';
import { ProcessedFileData } from './utils/ProcessFile';
import { SectionsGrid } from './components/SectionsGrid';

export const BoqSections: React.FC<{ projectId: number }> = ({ projectId }) => {
  const [isSheetDialogOpen, setIsSheetDialogOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<ProcessedFileData | null>(
    null
  );
  const [importError, setImportError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedData) {
      handleData(selectedData);
      setSelectedData(null);
    }
    if (importError) {
      console.log(importError), setImportError(null);
    }
  }, [selectedData, importError]);

  const handleData = (data: ProcessedFileData) => {
    if (data.type === 'xlsx') {
      console.log('excel data', data);
    }
    if (data.type === 'csv') {
      console.log('csv data', data);
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
      <ImportData onData={setSelectedData} onError={setImportError} />
      <SectionsGrid/>
      <SelectSheetName isOpen={isSheetDialogOpen} onClose={closeSheetDialog} />
    </div>
  );
};
