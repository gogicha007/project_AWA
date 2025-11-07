import React from 'react';
import { useProjectDetailsApi } from '@/api/hooks/projects/projectDetailsApiHook';
import { useCurrencyApiHook } from '@/api/hooks/settings/useCurrencyApiHook';
import Loader from '@/components/feedback/loader/loader';
import { useTranslations } from 'next-intl';
import { format } from 'date-fns';

export const ProjectDetails = ({ id }: { id: number }) => {
  const { project, loading, error } = useProjectDetailsApi(id);
  const {
    currencies,
    loading: currenciesLoading,
    error: currenciesError,
  } = useCurrencyApiHook();
  const tPjDet = useTranslations('ProjectDetails');

  if (loading || currenciesLoading) return <Loader />;
  if (error || currenciesError) return <div>{tPjDet('errors.loading')}</div>;

  const currency = currencies.find(
    (currency) => currency.id === project?.currencyId
  )?.code;
  return (
    <div className="flex flex-col gap-4 p-6 ">
      <h2>{project?.fullName}</h2>
      <p>{project?.displayName}</p>
      <p>{project?.notes}</p>
      <p>{`${tPjDet('labels.status')}: ${project?.status}`}</p>
      <p>{`${tPjDet('labels.currency')}: ${currency}`}</p>
      <p>
        {`${tPjDet('labels.start_date')}: ${
          project?.startDate ? format(new Date(project.startDate), 'dd.MM.yyyy') : '-'
        }`}
      </p>
      <p>
        {`${tPjDet('labels.end_date')}: ${
          project?.endDate ? format(new Date(project.endDate), 'dd.MM.yyyy') : '-'
        }`}
      </p>
    </div>
  );
};
