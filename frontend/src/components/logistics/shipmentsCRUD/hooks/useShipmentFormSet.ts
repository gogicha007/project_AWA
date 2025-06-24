'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'use-intl';
import { useAuth } from '@/context/auth';
import { useForm, FormProvider } from 'react-hook-form';
import { useCurrencyApiHook } from '@/api/hooks/settings/useCurrencyApiHook';
import { useVendorsApiHook } from '@/api/hooks/settings/useVendorsApiHook';
import { arrayToIdValueMap } from '@/utils/helper';
import { FileData } from '@/components/controls/file-input/FileInput';
import { formatToISODateTime } from '@/utils/dateFormat';
import { InvoiceDTO } from '@/api/types';
import { shipmentApi } from '@/api/endpoints/shipments/shipmentApi';

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
    reset,
    formState: { isDirty, isSubmitting },
  } = formMethods;
  const [disableSubmitBtn, setDisableSubmitBtn] = useState(true);
  const [shipmentId, setShipmentId] = useState(id);
  const isEditMode = !!id;

  const currenciesObj = arrayToIdValueMap(currencies, 'code');
  const vendorsObj = arrayToIdValueMap(vendors, 'alias');
  console.log(currenciesObj, vendorsObj);

  useEffect(() => {
    setLoading(
      currenciesLoading || vendorsLoading || authLoading || isSubmitting
    );
  }, [currenciesLoading, vendorsLoading, authLoading, isSubmitting]);

  useEffect(() => {
    setDisableSubmitBtn((isDirty && !!shipmentId))
    console.log('is dirty', isDirty, shipmentId);
  }, [isDirty, shipmentId]);

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

  const handleGenInfoSubmit = async (data: ShipmentFormValues) => {
    try {
      if (dbUserId === null) {
        throw new Error('User ID is required to create a chipmentF');
      }
      const formattedDate = formatToISODateTime(data.declaration_date);
      const createdShipment = await shipmentApi.create(
        {
          ...data,
          declaration_number: data.declaration_number ?? '',
          declaration_date: formattedDate as Date,
        },
        dbUserId
      );
      reset({
        alias: createdShipment.alias,
        status: createdShipment.status as 'APPLIED' | 'DECLARED' | 'ARRIVED',
        declaration_number: createdShipment.declaration_number || '',
        declaration_date: createdShipment.declaration_date
          ? typeof createdShipment.declaration_date === 'string'
            ? new Date(createdShipment.declaration_date)
            : createdShipment.declaration_date
          : undefined,
        files: [],
        invoices: [],
      });
      setShipmentId(createdShipment.id);
      setSnackbarStatus({ message: 'Shipment created', success: true });
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarStatus({
        message:
          error instanceof Error
            ? error.message
            : 'An error occurred while saving the shipment',
        success: false,
      });
      setSnackbarOpen(true);
    }
  };

  const handleEditSubmit = (data: ShipmentFormValues) => {
    console.log('submit edited', data);
  };

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
    isDirty,
    isEditMode,
    loading,
    FormProvider,
    formMethods,
    setFileDataArray,
    shipmentId,
    snackbarOpen,
    snackbarStatus,
    handleGenInfoSubmit,
    tB,
    tS,
  };
}
