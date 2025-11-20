'use client';

import ErrorMessage from '../shared/ErrorMessage';
import Loader from '@/components/feedback/loader/loader';
import { sectionsApi } from '../api/boqSectionsApi';
import { SectionsTable } from './components/sections-table/SectionsTable';
import { useProject } from '../context/ProjectContext';
import { useQuery } from '@tanstack/react-query';
import { useLocationQueries } from '../project-locations/hooks/useLocationQueries';
import { LocationDTO } from '../project-locations/schema/locationSchema';

export const BoqSections = () => {
  const { displayName, id } = useProject();

  const {
    isPendingLocations,
    isErrorLocations,
    isSuccessLocations,
    locationsData,
    getAllLocationsError,
  } = useLocationQueries();

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
              ? getAllLocationsError instanceof Error
                ? getAllLocationsError.message
                : String(getAllLocationsError)
              : null,
            section: isErrorSections
              ? sectionsError instanceof Error
                ? sectionsError.message
                : String(sectionsError)
              : null,
          }}
        />
      )}
      {isSuccessSections && isSuccessLocations && (
        <SectionsTable
          projectId={id as number}
          initialData={sectionsData}
          locations={locationsData as LocationDTO[]}
        />
      )}
    </div>
  );
};
