import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import GeneralInfoFields from './GeneralInfoFields';
import { useTranslations } from 'next-intl';

export const ShipmentFormSet = () => {
  const methods = useForm();
  const tS = useTranslations('Logistics');
  return (
    <FormProvider {...methods}>
      <GeneralInfoFields tS={tS} />
    </FormProvider>
  );
};
