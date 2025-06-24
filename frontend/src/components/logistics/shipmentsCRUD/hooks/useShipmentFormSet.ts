'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'use-intl';
import { useAuth } from '@/context/auth';
import { useForm, FormProvider } from 'react-hook-form';
import { useCurrencyApiHook } from '@/api/hooks/settings/useCurrencyApiHook';
import { useVendorsApiHook } from '@/api/hooks/settings/useVendorsApiHook';
import { arrayToIdValueMap } from '@/utils/helper';
// import { FileData } from '@/components/controls/file-uploader/FileUploader';
import { FileData } from '@/components/controls/file-input/FileInput';
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
  const [fileDataArray, setFileDataArray] = useState<FileData[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarStatus, setSnackbarStatus] = useState<{
    message: string;
    success: boolean;
  }>({ message: '', success: false });
  const formMethods = useForm<ShipmentFormValues>({
    defaultValues: {
      alias: '',
      status: undefined,
      declaration_number: '',
      declaration_date: undefined,
      files: [],
      invoices: [],
    },
  });
  const {
    watch,
    formState: { isSubmitting, isSubmitSuccessful },
  } = formMethods;
  const [disableSubmitBtn, setDisableSubmitBtn] = useState(true);
  const [shipmentId, setShipmentId] = useState(id);
  const isEditMode = !!id;

  const currenciesObj = arrayToIdValueMap(currencies, 'code');
  const vendorsObj = arrayToIdValueMap(vendors, 'alias');
  console.log('isSubmitSuccessful', isSubmitSuccessful);
  console.log(currenciesObj, vendorsObj);

  useEffect(() => {
    setLoading(
      currenciesLoading || vendorsLoading || authLoading || isSubmitting
    );
  }, [currenciesLoading, vendorsLoading, authLoading, isSubmitting]);

  useEffect(() => {
    const subscription = watch((values) => {
      setDisableSubmitBtn(!(values.alias && values.status));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    if (
      !id ||
      authLoading ||
      dbUserId === null ||
      currenciesLoading ||
      vendorsLoading
    )
      return;
    setFileDataArray([]);
  }, [id, authLoading, currenciesLoading, dbUserId]);

  const submitGenInfo = (data: ShipmentFormValues) => {
    console.log(data);
    const id = 1;
    setShipmentId(id);
    setSnackbarStatus({ message: 'Shipment created', success: true });
    setSnackbarOpen(!!id);
  };

  const handleEditSubmit = (data: ShipmentFormValues) => {
    console.log('submit edited', data)
  }

  const handleCancel = () => {
    router.push('/shipments');
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return {
    auxData: { currencies, vendors },
    disableSubmitBtn,
    fileDataArray,
    handleCancel,
    handleEditSubmit,
    handleSnackbarClose,
    isEditMode,
    loading,
    FormProvider,
    formMethods,
    setFileDataArray,
    shipmentId,
    snackbarOpen,
    snackbarStatus,
    submitGenInfo,
    tB,
    tS,
  };
}
