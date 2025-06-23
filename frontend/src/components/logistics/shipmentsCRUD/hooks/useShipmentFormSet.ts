'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'use-intl';
import { useAuth } from '@/context/auth';
import { useForm, FormProvider } from 'react-hook-form';
import { useCurrencyApiHook } from '@/api/hooks/settings/useCurrencyApiHook';
import { useVendorsApiHook } from '@/api/hooks/settings/useVendorsApiHook';
import { arrayToIdValueMap } from '@/utils/helper';
import { FileData } from '@/components/controls/file-uploader/FileUploader';
import { InvoiceDTO } from '@/api/types';

export type ShipmentFormValues = {
  alias: string;
  status: 'APPLIED' | 'DECLARED' | 'ARRIVED';
  declaration_number?: string;
  declaration_date?: Date;
  files?: Array<FileData>;
  invoices?: Array<InvoiceDTO>;
};

export function useShipmentFormSet(id?: number) {
  const router = useRouter();
  const tB = useTranslations('Buttons');
  const tS = useTranslations('Logistics');
  const { dbUserId, loading: authLoading } = useAuth();
  const { currencies, loading: currenciesLoading } = useCurrencyApiHook();
  const { vendors, loading: vendorsLoading } = useVendorsApiHook();
  const [loading, setLoading] = useState(false);
  const formMethods = useForm<ShipmentFormValues>();
  const isEditMode = !!id;

  const currenciesObj = arrayToIdValueMap(currencies, 'code');
  const vendorsObj = arrayToIdValueMap(vendors, 'alias');

  console.log(currenciesObj, vendorsObj);

  useEffect(() => {
    setLoading(currenciesLoading || vendorsLoading || authLoading);
  }, [currenciesLoading, vendorsLoading, authLoading]);

  useEffect(() => {
    if (
      !id ||
      authLoading ||
      dbUserId === null ||
      currenciesLoading ||
      vendorsLoading
    )
      return;
  }, [id, authLoading, currenciesLoading, dbUserId]);

  const submitGenInfo = (data: ShipmentFormValues) => {
    console.log(data);
  };

  const handleCancel = () => {
    router.push('/shipments');
  };

  return {
    handleCancel,
    isEditMode,
    loading,
    FormProvider,
    formMethods,
    submitGenInfo,
    tB,
    tS,
  };
}
