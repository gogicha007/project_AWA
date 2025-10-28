import React, { useEffect, useState } from 'react';
import { ImportData } from './components/ImportData';
import SelectSheetName from './components/SelectSheetName';
import { ProcessedFileData } from './utils/ProcessFile';
import { SectionsGrid } from './components/SectionsGrid';
import * as XLSX from 'xlsx';

export const BoqSections: React.FC<{ projectId: number }> = ({ projectId }) => {



  return (
    <div className="flex flex-col items-start gap-4 p-6">
      <h2 className="text-lg font-semibold">
        Bill of Quantities (BoQ) for Project ID: {projectId}
      </h2>
      <ImportData />
      <SectionsGrid />
    </div>
  );
};
