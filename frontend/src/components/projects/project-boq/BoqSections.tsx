import React from 'react';
import { ImportData } from './components/ImportData';
import { SectionsGrid } from './components/SectionsGrid';

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
