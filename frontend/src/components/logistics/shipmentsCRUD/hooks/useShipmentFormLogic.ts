import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useAuth } from '@/context/auth';
import { shipmentApi } from '@/api/endpoints/shipments/shipmentApi';
import { shipmentFileApi } from '@/api/endpoints/shipments/shipmentFileApi';
import { enUS as enUSLocale, ka as kaLocale } from 'date-fns/locale';
import { formatToISODateTime } from '@/utils/dateFormat';
import { FileData } from '@/components/controls/file-uploader/FileUploader';

const localeMap = {
  en: enUSLocale,
  ka: kaLocale,
};

export type ShipmentFormValues = {
  alias: string;
  status: 'APPLIED' | 'DECLARED' | 'ARRIVED';
  declaration_number?: string;
  declaration_date?: Date;
  files?: Array<FileData>;
};

export function useShipmentForm(id?: number) {
  const router = useRouter();
  const localeCode = useLocale();
  const tS = useTranslations('Logistics');
  const tB = useTranslations('Buttons');
  const { dbUserId, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [fileDataArray, setFileDataArray] = useState<FileData[]>([]);
  const [originalFiles, setOriginalFiles] = useState<FileData[]>([]);
  const [isFilesChanged, setIsFilesChanged] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const isEditMode = !!id;

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ShipmentFormValues>({
    defaultValues: {
      alias: '',
      status: undefined,
      declaration_number: '',
      declaration_date: undefined,
    },
  });

  useEffect(() => {
    if (!id || authLoading || dbUserId === null) return;

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
        setFileDataArray(files);
        setOriginalFiles(files);

        // const invoices = []
      } catch (error) {
        console.error('Failed to fetch shipment:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchShipment();
  }, [id, reset, authLoading, dbUserId]);

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
    tS,
    tB,
    loading,
    localeCode,
    localeMap,
    control,
    register,
    handleSubmit,
    isEditMode,
    errors,
    fileDataArray,
    setFileDataArray,
    originalFiles,
    isFilesChanged,
    setIsFilesChanged,
    submitHandler,
    handleCancel,
    snackbarOpen,
    snackbarMessage,
    handleSnackbarClose,
  };
}
