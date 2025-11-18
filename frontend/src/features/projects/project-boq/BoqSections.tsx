'use client';

import ErrorMessage from '../shared/ErrorMessage';
import Loader from '@/components/feedback/loader/loader';
import { locationsApi } from '../project-locations/api/locationsApi';
import { sectionsApi } from '../api/boqSectionsApi';
import { SectionsTable } from './components/sections-table/SectionsTable';
import { useProject } from '../context/ProjectContext';
import { useQuery } from '@tanstack/react-query';

export const BoqSections = () => {
  const { displayName, id } = useProject();

  const {
    isPending: isPendingLocations,
    isError: isErrorLocations,
    isSuccess: isSuccessLocations,
    data: locationsData,
    error: locationsError,
  } = useQuery({
    queryKey: ['projectLocations'],
    queryFn: locationsApi.getAll,
  });

  const {
    isPending: isPendingSections,
    isError: isErrorSections,
    isSuccess: isSuccessSections,
    data: sectionsData,
    error: sectionsError,
  } = useQuery({
    queryKey: ['projectSections'],
    queryFn: sectionsApi.getAll,
  });

  if (isPendingLocations || isPendingSections) return <Loader />;

  return (
    <div className="flex flex-col items-start gap-4 p-6">
      <h2 className="text-lg font-semibold">
        Bill of Quantities (BoQ) for: {displayName}
      </h2>
      {(isErrorSections || isErrorLocations) && (
        <ErrorMessage
          message={{
            location: isErrorLocations
              ? locationsError instanceof Error
                ? locationsError.message
                : String(locationsError)
              : null,
            section: isErrorSections
              ? sectionsError instanceof Error
                ? sectionsError.message
                : String(sectionsError)
              : null,
          }}
        />
      )}
      {(isSuccessSections && isSuccessLocations) && (
        <SectionsTable
          projectId={id as number}
          initialData={sectionsData}
          locations={locationsData}
        />
      )}
    </div>
  );
};
