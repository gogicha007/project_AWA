'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'use-intl';
import { useAuth } from '@/context/auth';
import { useForm, FormProvider } from 'react-hook-form';
import { useCurrencyApiHook } from '@/api/hooks/settings/useCurrencyApiHook';
import { useVendorsApiHook } from '@/api/hooks/settings/useVendorsApiHook';
import { useMaterialNames } from '@/api/hooks/settings/useMaterialNamesHook';
import { useUnits } from '@/api/hooks/settings/useUnitsHook';
import { FileData } from '@/components/controls/file-input/FileInput';
import { InvoiceDTO, InvoiceItemDTO } from '@/api/types';

import { createDefaultValues } from './utils/shipmentFormUtils';
import { useShipmentSubmitHandlers } from './handlers/useShipmentSubmitHandlers';
import { useShipmentData } from './data/useShipmentData';

export type ShipmentFormValues = {
  alias: string;
  status: '' | 'APPLIED' | 'DECLARED' | 'ARRIVED';
  declaration_number?: string;
  declaration_date?: Date;
  files?: Array<FileData>;
  invoices?: Array<InvoiceDTO>;
  invoiceItems?: Array<InvoiceItemDTO>;
    _hasRemovals: boolean,
};

export function useShipmentFormSet(id?: number) {
  const router = useRouter();
  const tB = useTranslations('Buttons');
  const tS = useTranslations('Logistics');
  const { dbUserId, loading: authLoading } = useAuth();
  const { currencies, loading: currenciesLoading } = useCurrencyApiHook();
  const { vendors, loading: vendorsLoading } = useVendorsApiHook();
  const { materialNames: materials, loading: materialsLoading } =
    useMaterialNames();
  const { units, loading: unitsLoading } = useUnits();

  const [loading, setLoading] = useState(false);
  const [fileDataArray, setFileDataArray] = useState<FileData[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarStatus, setSnackbarStatus] = useState<{
    message: string;
    success: boolean;
  }>({ message: '', success: false });
  const [disableSubmitBtn, setDisableSubmitBtn] = useState(true);
  const [shipmentId, setShipmentId] = useState(id);

  const formMethods = useForm<ShipmentFormValues>({
    defaultValues: createDefaultValues(),
  });

  const {
    watch,
    reset,
    formState: {
      isDirty,
      isSubmitting,
      defaultValues: originalValues,
      dirtyFields,
    },
  } = formMethods;

  const { handleGenInfoSubmit, handleEditSubmit } = useShipmentSubmitHandlers(
    shipmentId,
    dbUserId,
    originalValues as Partial<ShipmentFormValues>,
    dirtyFields,
    setSnackbarStatus,
    setSnackbarOpen,
    reset,
    setShipmentId
  );

  useShipmentData(
    id,
    authLoading,
    dbUserId,
    currenciesLoading,
    vendorsLoading,
    reset,
    setFileDataArray,
    setShipmentId,
    setLoading,
    setSnackbarStatus,
    setSnackbarOpen
  );

  useEffect(() => {
    setLoading(
      currenciesLoading ||
        vendorsLoading ||
        materialsLoading ||
        unitsLoading ||
        authLoading ||
        isSubmitting
    );
  }, [
    currenciesLoading,
    vendorsLoading,
    materialsLoading,
    unitsLoading,
    authLoading,
    isSubmitting,
  ]);

  useEffect(() => {
    setDisableSubmitBtn(!isDirty);
    console.log('is dirty', isDirty);
  }, [isDirty]);

  useEffect(() => {
    let subscription: ReturnType<typeof watch> | undefined;
    if (!shipmentId) {
      subscription = watch((values) => {
        setDisableSubmitBtn(!(values.alias && values.status));
      });
    }
    return () => {
      if (subscription && typeof subscription.unsubscribe === 'function') {
        subscription.unsubscribe();
      }
    };
  }, [watch, shipmentId]);

  const handleCancel = () => {
    router.push('/shipments');
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return {
    auxData: { currencies, vendors, materials, units },
    disableSubmitBtn,
    fileDataArray,
    FormProvider,
    formMethods,
    handleCancel,
    handleEditSubmit,
    handleGenInfoSubmit,
    isDirty,
    loading,
    setFileDataArray,
    shipmentId,
    snackbarControls: {
      isOpen: snackbarOpen,
      status: snackbarStatus,
      setStatus: setSnackbarStatus,
      setOpen: setSnackbarOpen,
      onClose: handleSnackbarClose,
    },
    tB,
    tS,
  };
}
