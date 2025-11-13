import React from 'react';
import { SectionsTable } from './components/sections-table/SectionsTable';

export const BoqSections: React.FC<{ projectId: number }> = ({ projectId }) => {
  return (
    <div className="flex flex-col items-start gap-4 p-6">
      <h2 className="text-lg font-semibold">
        Bill of Quantities (BoQ) for Project ID: {projectId}
      </h2>
      <SectionsTable projectId={projectId} />
    </div>
  );
};
