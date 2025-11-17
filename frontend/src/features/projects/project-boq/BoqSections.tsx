import React from 'react';
import { SectionsTable } from './components/sections-table/SectionsTable';
import { BoqSectionDTO } from '../api/boqSectionsApi';
import { useProject } from '../context/ProjectContext';

export const BoqSections: React.FC<{
  projectId: number;
  initialData?: BoqSectionDTO[];
}> = ({ projectId, initialData }) => {
  const { displayName } = useProject();
  return (
    <div className="flex flex-col items-start gap-4 p-6">
      <h2 className="text-lg font-semibold">
        Bill of Quantities (BoQ) for: {displayName}
      </h2>
      <SectionsTable projectId={projectId} initialData={initialData} />
    </div>
  );
};
