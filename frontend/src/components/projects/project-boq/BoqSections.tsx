import React, { useEffect, useState } from 'react';
import { ImportFile } from './components/ImportFile';
import SelectSheetName from './components/SelectSheetName';
import { ProcessedFileData } from './utils/ProcessFile';

export const BoqSections: React.FC<{ projectId: number }> = ({ projectId }) => {
  const [isSheetDialogOpen, setIsSheetDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<ProcessedFileData | null>(
    null
  );

  useEffect(() => {
    if (selectedFile) console.log(selectedFile);
  }, [selectedFile]);
  
  const closeSheetDialog = () => {
    setIsSheetDialogOpen(false);
  };

  return (
    <div className="flex flex-col items-start gap-4 p-6">
      <h2 className="text-lg font-semibold">
        Bill of Quantities (BoQ) for Project ID: {projectId}
      </h2>
      <ImportFile onFileSelect={setSelectedFile} />
      <SelectSheetName isOpen={isSheetDialogOpen} onClose={closeSheetDialog} />
    </div>
  );
};
