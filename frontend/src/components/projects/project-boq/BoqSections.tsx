import React, { useEffect, useState } from 'react';
import { ImportData } from './components/ImportData';
import SelectSheetName from './components/SelectSheetName';
import { ProcessedFileData } from './utils/ProcessFile';

export const BoqSections: React.FC<{ projectId: number }> = ({ projectId }) => {
  const [isSheetDialogOpen, setIsSheetDialogOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<ProcessedFileData | null>(
    null
  );
  const [importError, setImportError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedData) console.log(selectedData);
    if (importError) {
      console.log(importError), setImportError(null);
    }
  }, [selectedData, importError]);

  const closeSheetDialog = () => {
    setIsSheetDialogOpen(false);
  };

  return (
    <div className="flex flex-col items-start gap-4 p-6">
      <h2 className="text-lg font-semibold">
        Bill of Quantities (BoQ) for Project ID: {projectId}
      </h2>
      <ImportData
        onData={setSelectedData}
        onError={setImportError}
      />
      <SelectSheetName isOpen={isSheetDialogOpen} onClose={closeSheetDialog} />
    </div>
  );
};
