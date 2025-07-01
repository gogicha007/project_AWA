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
import { formatToISODateTime } from '@/utils/dateFormat';
import { InvoiceDTO, InvoiceItemDTO } from '@/api/types';
import { shipmentApi } from '@/api/endpoints/shipments/shipmentApi';

export type ShipmentFormValues = {
  alias: string;
  status: '' | 'APPLIED' | 'DECLARED' | 'ARRIVED';
  declaration_number?: string;
  declaration_date?: Date;
  files?: Array<FileData>;
  invoices?: Array<InvoiceDTO>;
  invoiceItems?: Array<InvoiceItemDTO>;
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
  const defaultValues = {
    alias: '',
    status: '' as '' | 'APPLIED' | 'DECLARED' | 'ARRIVED',
    declaration_number: '',
    declaration_date: undefined,
    files: [],
    invoices: [],
    invoiceItems: [],
  };
  const formMethods = useForm<ShipmentFormValues>({
    defaultValues,
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
  const [disableSubmitBtn, setDisableSubmitBtn] = useState(true);
  const [shipmentId, setShipmentId] = useState(id);

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

    setShipmentId(id);
    setLoading(true);
    const fetchShipment = async () => {
      try {
        const shipment = await shipmentApi.getById(id);

        const shipmentFormData = {
          alias: shipment.alias,
          status: shipment.status as 'APPLIED' | 'DECLARED' | 'ARRIVED',
          declaration_number: shipment.declaration_number || '',
          declaration_date: shipment.declaration_date
            ? typeof shipment.declaration_date === 'string'
              ? new Date(shipment.declaration_date)
              : shipment.declaration_date
            : undefined,
          files: shipment.Files,
          invoices: shipment.Invoices,
          invoiceItems: shipment.Invoices
            ? shipment.Invoices.flatMap((inv) => inv.Items ?? [])
            : [],
        };

        reset(shipmentFormData);
        setFileDataArray(shipment.Files || []);
      } catch (error) {
        console.error('Failed to fetch shipment:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchShipment();
  }, [id, reset, authLoading, vendorsLoading, currenciesLoading, dbUserId]);

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

  const handleEditSubmit = async (data: ShipmentFormValues) => {
    try {
      if (!shipmentId || dbUserId === null) {
        throw new Error(
          'Shipment ID and User ID are required to update shipment'
        );
      }
      // const generalFields = [
      //   'alias',
      //   'declaration_date',
      //   'declaration_number',
      //   'status',
      // ];
      // const fileFields = [];
      // const invoiceFields = [];
      // const InvoiceItemFields = [];
      console.log('submit edited', data);
      console.log('original values', originalValues);
      console.log('dirty fields', dirtyFields);

      // const formattedDate = formatToISODateTime(data.declaration_date);

      // const updatedShipment = await shipmentApi.update(
      //   {
      //     id: shipmentId,
      //     alias: data.alias,
      //     declaration_number: data.declaration_number ?? '',
      //     declaration_date: formattedDate as Date,
      //     status: data.status,
      //     Files: data.files,
      //     Invoices: data.invoices,
      //   },
      //   dbUserId
      // );

      setSnackbarStatus({
        message: 'Shipment updated successfully',
        success: true,
      });
      setSnackbarOpen(true);

      // router.push('/shipments');

      // return updatedShipment;
      return;
    } catch (error) {
      setSnackbarStatus({
        message:
          error instanceof Error
            ? error.message
            : 'An error occurred while updating the shipment',
        success: false,
      });
      setSnackbarOpen(true);
    }
  };

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
