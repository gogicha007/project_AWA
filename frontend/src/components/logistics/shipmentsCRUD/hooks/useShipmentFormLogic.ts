import { FileData } from '@/components/controls/file-uploader/FileUploader';
import { formatToISODateTime } from '@/utils/dateFormat';
import { InvoiceDTO } from '@/api/types';
import { shipmentApi } from '@/api/endpoints/shipments/shipmentApi';
import { shipmentFileApi } from '@/api/endpoints/shipments/shipmentFileApi';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/context/auth';
import { useCurrencyApiHook } from '@/api/hooks/settings/useCurrencyApiHook';
import { useVendorsApiHook } from '@/api/hooks/settings/useVendorsApiHook';

export type ShipmentFormValues = {
  alias: string;
  status: 'APPLIED' | 'DECLARED' | 'ARRIVED';
  declaration_number?: string;
  declaration_date?: Date;
  files?: Array<FileData>;
  invoices?: Array<InvoiceDTO>;
};

export function useShipmentFormLogic(id?: number) {
  const router = useRouter();
  const tS = useTranslations('Logistics');
  const tB = useTranslations('Buttons');
  const { dbUserId, loading: authLoading } = useAuth();
  const { currencies, loading: currenciesLoading } = useCurrencyApiHook();
  const { vendors, loading: vendorsLoading } = useVendorsApiHook();
  const [loading, setLoading] = useState(false);
  const [fileDataArray, setFileDataArray] = useState<FileData[]>([]);
  const [originalFiles, setOriginalFiles] = useState<FileData[]>([]);
  const [invoiceArray, setInvoiceArray] = useState<InvoiceDTO[]>([]);
  const [isFilesChanged, setIsFilesChanged] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [disableSubmitBtn, setDisableSubmitBtn] = useState(true);
  const [enableTabs, setEnableTabs] = useState<boolean>(false);
  const [shipmentId, setShipmentId] = useState(id);
  const isEditMode = !!id;
  const {
    control,
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors, dirtyFields },
  } = useForm<ShipmentFormValues>({
    defaultValues: {
      alias: '',
      status: undefined,
      declaration_number: '',
      declaration_date: undefined,
      files: [],
      invoices: [],
    },
  });

  console.log(dirtyFields);

  const currenciesObj = currencies.reduce(
    (acc, { id, code }) => {
      if (id !== undefined) {
        acc[id] = code;
      }
      return acc;
    },
    {} as Record<number, string>
  );

  const vendorsArray = vendors.map(({ id, alias }) => ({ id, alias }));
  const vendorsObj = vendorsArray.reduce(
    (acc, { id, alias }) => {
      if (id !== undefined) {
        acc[id] = alias;
      }
      return acc;
    },
    {} as Record<number, string>
  );

  useEffect(() => {
    const subscription = watch((values) => {
      setDisableSubmitBtn(!(values.alias && values.status));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    setEnableTabs(!!shipmentId);
  }, [shipmentId]);

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

    setLoading(true);
    const fetchShipment = async () => {
      try {
        const shipment = await shipmentApi.getById(id);
        reset({
          alias: shipment.alias,
          status: shipment.status as 'APPLIED' | 'DECLARED' | 'ARRIVED',
          declaration_number: shipment.declaration_number || '',
          declaration_date: shipment.declaration_date
            ? typeof shipment.declaration_date === 'string'
              ? new Date(shipment.declaration_date)
              : shipment.declaration_date
            : undefined,
        });
        const files = shipment.Files || [];
        let invoices = shipment.Invoices || [];
        if (invoices.length > 0) {
          invoices = invoices.map((inv) => ({
            ...inv,
            id:
              typeof inv.id === 'string'
                ? parseInt(inv.id, 10)
                : Number(inv.id),
            vendor: vendorsObj[id],
            currency: currenciesObj[id],
          }));
        }
        setInvoiceArray(invoices);
        setFileDataArray(files);
        setOriginalFiles(files);
      } catch (error) {
        console.error('Failed to fetch shipment:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchShipment();
  }, [id, reset, authLoading, dbUserId, currencies, vendors]);

  const submitHandler = async (data: ShipmentFormValues) => {
    try {
      if (dbUserId === null) {
        throw new Error('User ID is required to create a shipment.');
      }
      const formattedDate = formatToISODateTime(data.declaration_date);

      if (isEditMode && id) {
        await shipmentApi.update(
          {
            id: id,
            ...data,
            declaration_number: data.declaration_number ?? '',
            declaration_date: formattedDate as Date,
          },
          dbUserId
        );

        if (isFilesChanged) {
          await shipmentFileApi.update(fileDataArray, id);
        }
      } else {
        const createdShipment = await shipmentApi.create(
          {
            ...data,
            declaration_number: data.declaration_number ?? '',
            declaration_date: formattedDate as Date,
          },
          dbUserId
        );

        if (fileDataArray.length > 0) {
          if (createdShipment.id === undefined) {
            throw new Error('Created shipment ID is undefined.');
          }
          await shipmentFileApi.create(fileDataArray, createdShipment.id);
        }

        setShipmentId(createdShipment.id);
      }

      router.push('/shipments');
    } catch (error) {
      setSnackbarMessage(
        error instanceof Error
          ? error.message
          : 'An error occurred while saving the shipment'
      );
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleCancel = () => {
    router.push('/shipments');
  };

  return {
    control,
    currencies,
    disableSubmitBtn,
    enableTabs,
    errors,
    fileDataArray,
    handleCancel,
    handleSnackbarClose,
    handleSubmit,
    invoiceArray,
    isEditMode,
    isFilesChanged,
    loading,
    originalFiles,
    register,
    setFileDataArray,
    setIsFilesChanged,
    snackbarOpen,
    snackbarMessage,
    submitHandler,
    tB,
    tS,
    vendors,
  };
}
